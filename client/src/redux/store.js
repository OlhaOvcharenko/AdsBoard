import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { withExtraArgument, thunk } from 'redux-thunk';
import initialState from './initialState';
import adsReducer from './adsRedux';
import usersReducer from './userRedux';

// combine reducers
const rootReducer = combineReducers({
  ads: adsReducer,
  user: usersReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(withExtraArgument(thunk))));

export default store;