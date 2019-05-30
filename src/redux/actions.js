import { ADD_OBJECT, CREATE_DRAWING, TRANSFORM_OBJECT, MOVE_OBJECT } from "./actionTypes";
import uuid from "uuid";

export const addObject = objectName => ({
  type: ADD_OBJECT,
  payload: {
    id: uuid.v4(), 
    url: "http://localhost:5000/" +  objectName + ".svg"
  }
});

export const transformObject = (id, rotation, scaleX, scaleY) => ({
  type: TRANSFORM_OBJECT,
  payload: {
    id,
    rotation,
    scaleX,
    scaleY
  }
});

export const moveObject = (id, x, y) => ({
  type: MOVE_OBJECT,
  payload: {
    id,
    x,
    y
  }
});

export const createDrawing = () => ({
  type: CREATE_DRAWING
});
