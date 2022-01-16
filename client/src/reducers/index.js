import { combineReducers } from "redux";

import todoReducers from "./todoReducers";
import todoCountReducer from "./todoCountReducer";

export default combineReducers({
  todoReducers: todoReducers,
  todoCountReducer: todoCountReducer,
});
