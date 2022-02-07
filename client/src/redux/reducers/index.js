import { combineReducers } from "redux";

import requestReducer from "./requestReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  requestReducer,
  userReducer,
});

// export type Store = ReturnType<typeof rootReducer>

export default rootReducer;
