import { ADD_OBJECT, CREATE_DRAWING } from "../actionTypes";

const initialState = {
  drawingInProgress: false
};

function rootReducer(state= initialState, action) {
  
  console.log(action);
      
  switch(action.type){
    
    case ADD_OBJECT:
      return {
        ...state
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