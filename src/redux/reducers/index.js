import { ADD_OBJECT, MOVE_OBJECT, TRANSFORM_OBJECT, CREATE_DRAWING, CHANGE_BRUSH_SIZE, DRAW_LINE } from "../actionTypes";

const initialState = {
  drawingInProgress: false,
  selectedItem: "road",
  brushSize: 5,
  canvasItems: []
};

function rootReducer(state= initialState, action) {
  
  console.log(action);
      
  switch(action.type){
    
    case ADD_OBJECT:
      const objectItem = {
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
        canvasItems: [...state.canvasItems, objectItem]
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
    
    case DRAW_LINE:
      const lineItem = {
        itemType: "line",
        id: action.payload.id,
        points: action.payload.points,
        brushSize: state.brushSize
      }

      return {
        ...state,
        canvasItems: [...state.canvasItems, lineItem]
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