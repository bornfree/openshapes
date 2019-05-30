import { ADD_OBJECT, MOVE_OBJECT, TRANSFORM_OBJECT, CREATE_DRAWING, CHANGE_BRUSH_SIZE, CHANGE_BRUSH_COLOR, DRAW_LINE, SELECT_BACKGROUND, DOWNLOAD_DRAWING, CLEAR_DRAWING, CHANGE_DRAWING_MODE } from "../actionTypes";
import { CLEAR } from "jest-util/build/specialChars";

const initialState = {
  drawingInProgress: false,
  selectedBackground: "road",
  brushSize: 40,
  drawingMode: "background",
  brushColor: [0,0,0],
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
        brushSize: state.brushSize,
        brushColor: state.brushColor
      }

      return {
        ...state,
        canvasItems: [...state.canvasItems, lineItem]
      }
    
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
    
    case CLEAR_DRAWING:
      return {
        ...state,
        canvasItems : []
      }

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

export default rootReducer;