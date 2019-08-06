from PIL import Image
import io
import os
import numpy as np

base = "./public/images"
for fname in os.listdir(base):
    fpath = os.path.join(base, fname)
    for iname in os.listdir(fpath):
        if not iname.endswith(".png"):
            continue
        ipath = os.path.join(fpath, iname)
        img = Image.open(ipath)
        img_array = np.array(img)[:,:,:3]

        # print(img_array.shape)
        pixels = img_array.reshape(-1,3)
        upixels = np.unique(pixels, axis=0)
        if len(upixels) > 2:
            print(f"{fname} - {iname} - {upixels}")