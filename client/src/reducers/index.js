import { combineReducers } from "redux";
import authReducer from "./auth";
import alertReducer from "./alert";
import profileReducer from "./profile";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer
});

export default rootReducer;
