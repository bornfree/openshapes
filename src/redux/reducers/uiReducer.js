import { CHANGE_BRUSH_SIZE, SELECT_BACKGROUND, DOWNLOAD_DRAWING, CHANGE_DRAWING_MODE, REQUEST_DRAWING, FETCH_DRAWING} from "../actionTypes";

const initialState = {
  drawingInProgress: false,
  selectedBackground: "road",
  brushSize: 40,
  drawingMode: "background",
  brushColor: [0,0,0],
  resultImages:[]
};

function uiReducer(state= initialState, action) {
  console.log(action);
  switch(action.type){
    
    case SELECT_BACKGROUND:
      const {itemName, brushColor} = action.payload;
      return {
        ...state,
        selectedBackground: itemName,
        brushColor
      }
    
    case CHANGE_BRUSH_SIZE:
      const {brushSize} = action.payload;
      return {
        ...state,
        brushSize
      }
    
    case DOWNLOAD_DRAWING:
      return state;
    
    case REQUEST_DRAWING:
      return {
        ...state,
        requestingDrawing: true
      }

    case FETCH_DRAWING:
      var resultImages = []
      for(var i = 0; i < 5;i++){
        resultImages.push(action.payload.results[i])
      }
      return{
        ...state,
        requestingDrawing: false,
        resultImages
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

export default uiReducer;