import { ADD_OBJECT, MOVE_OBJECT, TRANSFORM_OBJECT, DRAW_LINE, CLEAR_DRAWING } from "../actionTypes";

const initialState = {
    items: []
};
  

function canvasReducer(state= initialState, action) {
  
  switch(action.type){
    
    case ADD_OBJECT:
      const objectItem = {
        itemType: "object",
        id: action.payload.id,
        src: action.payload.url,
        x: 0,
        y: 0,
        rotation:0,
        scaleX: 1,
        scaleY: 1
      }
      return {
        ...state,
        items: [...state.items, objectItem]
      }

    case MOVE_OBJECT:
    
      var movedItems = state.items.map((item) => {
      if(item.id === action.payload.id){
          const movedItem = {
              ...item,
              x: action.payload.x,
              y: action.payload.y
          }
          return movedItem
        }
        return item
      });

      return {
        ...state,
        items: movedItems
      }
    
    case TRANSFORM_OBJECT:
      
      var transformedItems = state.items.map((item) => {
        if(item.id === action.payload.id){
            const transformedItem = {
                ...item,
                x: action.payload.x,
                y: action.payload.y,
                rotation: action.payload.rotation,
                scaleX: action.payload.scaleX,
                scaleY: action.payload.scaleY,
            }
            return transformedItem
        }
        return item
      });

      return {
        ...state,
        items: transformedItems
      }
    
    case DRAW_LINE:
      const lineItem = {
        itemType: "line",
        id: action.payload.id,
        points: action.payload.points,
        brushSize: action.payload.brushSize,
        brushColor: action.payload.brushColor
      }

      return {
        ...state,
        items: [...state.items, lineItem]
      }
    
    case CLEAR_DRAWING:
      return {
        ...state,
        items : []
      }

    default: 
      return state;
  }
  
};

export default canvasReducer;