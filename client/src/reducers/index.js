import { combineReducers } from "redux";
import authReducer from "./auth";
import postReducer from "./post";
import alertReducer from "./alert";
import profileReducer from "./profile";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  post: postReducer,
  profile: profileReducer,
});

export default rootReducer;
