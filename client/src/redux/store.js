import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { withExtraArgument, thunk } from 'redux-thunk';



// combine reducers
const rootReducer = combineReducers({

});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, applyMiddleware(withExtraArgument(thunk)))
export default store;
