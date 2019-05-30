import { ADD_OBJECT, MOVE_OBJECT, TRANSFORM_OBJECT, CREATE_DRAWING } from "../actionTypes";

const initialState = {
  drawingInProgress: false,
  canvasItems: [],
  selectedItem: "road"
};

function rootReducer(state= initialState, action) {
  
  console.log(action);
      
  switch(action.type){
    
    case ADD_OBJECT:
      const item = {
        itemType: "object",
        id: action.payload.id,
        src: action.payload.url,
        x: 0,
        y: 0,
        rotation:0,
        scaleX: 0,
        scaleY: 0
      }
      return {
        ...state,
        canvasItems: [...state.canvasItems, item]
      }

    case MOVE_OBJECT:
      
      var canvasItems = [];
      for(var i = 0; i < state.canvasItems.length;i++){
        
        let item = state.canvasItems[i];

        if(item.id === action.payload.id){
          item.x = action.payload.x;
          item.y = action.payload.y;
        }

        canvasItems.push(item);
      }

      return {
        ...state,
        canvasItems
      }
    
    case TRANSFORM_OBJECT:
      
      var canvasItems = [];
      for(var i = 0; i < state.canvasItems.length;i++){
        
        let item = state.canvasItems[i];

        if(item.id === action.payload.id){
          item.x = action.payload.x;
          item.y = action.payload.y;
          item.rotation = action.payload.rotation;
          item.scaleX = action.payload.scaleX;
          item.scaleY = action.payload.scaleY;
        }

        canvasItems.push(item);
      }

      return {
        ...state,
        canvasItems
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