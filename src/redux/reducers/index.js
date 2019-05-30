import { ADD_OBJECT, CREATE_DRAWING } from "../actionTypes";

const initialState = {
  drawingInProgress: false,
  canvasImages: [],
  brushSize: 20
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


    default: 
      return state;
  }
  
};

export default rootReducer;