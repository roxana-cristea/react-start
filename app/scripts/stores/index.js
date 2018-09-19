import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import appReducer from './app';

export default function configureStore() {
  return applyMiddleware(reduxThunk)(createStore)(combineReducers({
    app: appReducer,
  }));
}
