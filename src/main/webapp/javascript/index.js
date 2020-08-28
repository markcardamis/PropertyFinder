import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

import App from '../components/App';
import reducers from '../store/reducers/index';

const middlewares = [thunk];
if (process.env.LOGGING === `development`) {
    const logger = createLogger();
  
    middlewares.push(logger);
  }
export const store= createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middlewares));

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, document.getElementById('root')
    );

