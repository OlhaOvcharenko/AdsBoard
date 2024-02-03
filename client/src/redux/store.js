import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { withExtraArgument, thunk } from 'redux-thunk';
import adsReducer from './adsRedux';
// combine reducers
const rootReducer = combineReducers({
  ads: adsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(withExtraArgument(thunk))));

export default store;