import { ADD_OBJECT, CREATE_DRAWING } from "./actionTypes";
const path = require('path');

export const addObject = objectName => ({
    type: ADD_OBJECT,
    payload: {
      url: path.join("src", "images", objectName + ".svg")
    }
  });

export const createDrawing = () => ({
  type: CREATE_DRAWING
})