import { createStore, applyMiddleware } from "redux";
// import { createLogger } from 'redux-logger'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "../reducer/rootReducer";

const middleware = [thunk];
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);
