import { createStore, combineReducers } from "redux";
import uiReducer from "./reducers/uiReducer";
import canvasReducer from "./reducers/canvasReducer";
import undoable from 'redux-undo';

const rootReducer = combineReducers({
    ui: uiReducer,
    canvas: undoable(canvasReducer, {limit: 20})
})

export default createStore(rootReducer);
