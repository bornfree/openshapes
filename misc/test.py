import os
import cv2
import numpy as np
import time
from flask import Flask, request, jsonify
import base64
from io import BytesIO
from PIL import Image
from flask_cors import CORS
import io
# from annoy import AnnoyIndex
import json

with io.open("./src/coco.json") as f:
    coco = json.load(f)


# label_index = AnnoyIndex(3)
# label_names = []

# for i,item in enumerate(coco):
#     label_index.add_item(i, item["color"])
#     label_names.append(item["name"])

# label_index.add_item(i+1, [0,0,0])
# label_names.append("blank")

# label_index.build(10)


# Initialize flask
app = Flask(__name__)
CORS(app)

@app.route('/generate', methods=['POST'])
def generate():

        # Decode base64 images in payload
        input_map = Image.open(BytesIO(base64.b64decode(request.json['input_map'][22:])))
        instance_map = Image.open(BytesIO(base64.b64decode(request.json['instance_map'][22:])))

        
        # input_map = Image.open("/home/harsha/Pictures/canvas.png")

        # Convert to numpy arrays
        input_map = np.array(input_map, dtype=np.uint32)
        instance_map = np.array(instance_map, dtype=np.uint32)

        pixels = input_map

        # Reject values with alpha not 255

        print("Pixels shape", pixels.shape)
        aliased_pixels_condition = pixels.take(3,2) != 255
        pixels[aliased_pixels_condition] = [0,0,0,0]
        pixels = pixels[:,:,:-1]
        
        # opaque_pixels[np.invert(opaque_pixels_condition)] = [0,0,0,0]
        
        print(pixels.shape)

        upixels = np.unique(pixels.reshape(-1,3), axis=0)
        print("Unique pixels", upixels)

        # # ulabels = set()
        # for upixel in upixels:
        #     # label_id = label_index.get_nns_by_vector(upixel, 3)[0]
        #     # ulabels.add(label_names[label_id])
        #     print(upixel, "----", label_names[label_id])

        return jsonify({
            "message": "OK"
        })
        
if __name__ == "__main__":
    app.run(port=5000)