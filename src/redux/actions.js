import { ADD_OBJECT, CREATE_DRAWING, TRANSFORM_OBJECT, MOVE_OBJECT, CHANGE_BRUSH_SIZE, DRAW_LINE, SELECT_BACKGROUND, DOWNLOAD_DRAWING, CLEAR_DRAWING, CHANGE_DRAWING_MODE } from "./actionTypes";
import uuid from "uuid";
import { ActionCreators } from 'redux-undo';

export const addObject = objectName => ({
  type: ADD_OBJECT,
  payload: {
    id: uuid.v4(), 
    url: "/images/" +  objectName + ".svg"
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

export const drawLine = (points, brushColor, brushSize) => ({
  type: DRAW_LINE,
  payload: {
    id: uuid.v4(),
    points,
    brushColor,
    brushSize
  }
});

export const selectBackground = (itemName, brushColor) => ({
  type: SELECT_BACKGROUND,
  payload: {
    itemName,
    brushColor
  }
});

export const createDrawing = () => ({
  type: CREATE_DRAWING
});

export const downloadDrawing = () => ({
  type: DOWNLOAD_DRAWING
});

export const clearDrawing = () => ({
  type: CLEAR_DRAWING
});

export const changeDrawingMode = (drawingMode) => ({
  type: CHANGE_DRAWING_MODE,
  payload: {
    drawingMode
  }
});

export const changeBrushSize = (brushSize) => ({
  type: CHANGE_BRUSH_SIZE,
  payload: {
    brushSize
  }
});

export const undo = ActionCreators.undo
export const redo = ActionCreators.redo