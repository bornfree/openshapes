import { ADD_OBJECT, MOVE_OBJECT, TRANSFORM_OBJECT, CREATE_DRAWING, CHANGE_BRUSH_SIZE } from "../actionTypes";

const initialState = {
  drawingInProgress: false,
  canvasImages: [],
  brushSize: 5
};

function rootReducer(state= initialState, action) {
  
  console.log(action);
      
  switch(action.type){
    
    case ADD_OBJECT:
      const {url} = action.payload;
      return {
        ...state,
        canvasImages: [...state.canvasImages, url]
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

    default: 
      return state;
  }
  
};

export default rootReducer;