import { ADD_OBJECT, CREATE_DRAWING, TRANSFORM_OBJECT, MOVE_OBJECT, CHANGE_BRUSH_SIZE } from "./actionTypes";

export const addObject = objectName => ({
  type: ADD_OBJECT,
  payload: {
    url: "http://localhost:5000/" +  objectName + ".svg"
  }
});

export const transformObject = (objectName, rotation, scaleX, scaleY) => ({
  type: TRANSFORM_OBJECT,
  payload: {
    objectName,
    rotation,
    scaleX,
    scaleY
  }
});

export const moveObject = (objectName, x, y) => ({
  type: MOVE_OBJECT,
  payload: {
    objectName,
    x,
    y
  }
});

export const createDrawing = () => ({
  type: CREATE_DRAWING
});

export const changeBrushSize = (brushSize) => ({
  type: CHANGE_BRUSH_SIZE,
  payload: {
    brushSize
  }
});