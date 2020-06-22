import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from '../components/App';
import reducers from '../store/reducers/index';

const store= createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, document.getElementById('root')
    );

