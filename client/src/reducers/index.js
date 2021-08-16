import { combineReducers } from "redux";
import authReducer from "./auth";
import alertReducer from "./alert";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
});

export default rootReducer;
