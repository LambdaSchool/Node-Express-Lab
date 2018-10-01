import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { postsReducer } from './reducers/index';

const store = createStore(postsReducer, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
    , document.getElementById('root'));
registerServiceWorker();
