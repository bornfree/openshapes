import { ADD_OBJECT, REQUEST_DRAWING, FETCH_DRAWING, SELECT_DRAWING, TRANSFORM_OBJECT, MOVE_OBJECT, CHANGE_BRUSH_SIZE, DRAW_LINE, SELECT_BACKGROUND, DOWNLOAD_DRAWING, CLEAR_DRAWING, CHANGE_DRAWING_MODE, REQUEST_COMPLETE } from "./actionTypes";
import uuid from "uuid";
import { ActionCreators } from 'redux-undo';

export const addObject = (objectName, index) => ({
  type: ADD_OBJECT,
  payload: {
    id: uuid.v4(), 
    url: "/images/" +  objectName.replace(" ", "_") + "/" +index +".png"
  }
});

export const transformObject = (id, x,y, rotation, scaleX, scaleY) => ({
  type: TRANSFORM_OBJECT,
  payload: {
    id,
    x,
    y,
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

export const requestDrawing = () => ({
  type: REQUEST_DRAWING,
  
});

export const fetchDrawing = (results) => ({
  type: FETCH_DRAWING,
  payload:{
    results
  }
});
  
export const selectDrawing = (drawing) => ({
  type: SELECT_DRAWING,
  payload:{
    drawing
  }
});

export const selectBackground = (itemName, brushColor) => ({
  type: SELECT_BACKGROUND,
  payload: {
    itemName,
    brushColor
  }
});

export const downloadDrawing = () => ({
  type: DOWNLOAD_DRAWING
});

export const clearDrawing = () => ({
  type: CLEAR_DRAWING
});

export const requestComplete = () => ({
  type: REQUEST_COMPLETE
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