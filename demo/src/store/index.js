import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { setActionToStore, storeEnhancer } from "vuex-redux";

import todo from "./modules/todo";
import counter from "./modules/counter";

const logger = store => dispatch => action => {
  console.log("action", action)
  dispatch(action)
  console.log("store", store)
}

const reducerModules = {
  todo,
  counter,
}


const store = createStore(combineReducers(reducerModules), composeWithDevTools(
  applyMiddleware(logger),
  storeEnhancer
  // other store enhancers if any
));

setActionToStore(store, reducerModules)
export default store