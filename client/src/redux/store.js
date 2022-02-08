import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const storeFactory = () => {
  const middlewares = [thunk];

  function loadFromLocalStorage() {
    try {
      const localStorageState = localStorage.getItem("statePersist");
      const reduxState = localStorageState ? JSON.parse(localStorageState) : [];
      return reduxState;
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }
  const reduxStore = createStore(
    rootReducer,
    // loadFromLocalStorage(),
    // JSON.parse(localStorage.getItem("statePersist")),
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  reduxStore.subscribe(() => {
    // localStorage.setItem("statePersist", JSON.stringify(reduxStore.getState()));
  });
  return reduxStore;
};

export default storeFactory;
