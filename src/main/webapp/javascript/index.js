import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from '../components/App';
// import * as reducers from '../store/reducers';

// const store = createStore(combineReducers(reducers), applyMiddleware(thunk))

ReactDOM.render(
    
    <App /> , document.getElementById('root')
);

{/* <Provider store={store}></Provider>, */}