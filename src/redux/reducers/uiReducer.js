import { CREATE_DRAWING, CHANGE_BRUSH_SIZE, SELECT_BACKGROUND, DOWNLOAD_DRAWING, CHANGE_DRAWING_MODE } from "../actionTypes";

const initialState = {
  drawingInProgress: false,
  selectedBackground: "road",
  brushSize: 40,
  drawingMode: "background",
  brushColor: [0,0,0]
};

function uiReducer(state= initialState, action) {
  
  switch(action.type){
    
    case SELECT_BACKGROUND:
      const {itemName, brushColor} = action.payload;
      return {
        ...state,
        selectedBackground: itemName,
        brushColor
      }
    
    case CREATE_DRAWING:
      return {
        ...state,
        drawingInProgress: true
      }

    case CHANGE_BRUSH_SIZE:
      const {brushSize} = action.payload;
      return {
        ...state,
        brushSize
      }
    
    case DOWNLOAD_DRAWING:
      return state;
    
    case CHANGE_DRAWING_MODE:
      const {drawingMode} = action.payload;
      return {
        ...state,
        drawingMode
      }

    default: 
      return state;
  }
  
};

export default uiReducer;