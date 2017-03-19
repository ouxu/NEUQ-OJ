import React from 'react';
import ReactDOM from 'react-dom';

//引入redux
import {Provider} from 'react-redux';
import configStore from './stores';
const store = configStore();

import RouterApp from './router';
ReactDOM.render(
    <Provider store={store}>
       {RouterApp(store)}
    </Provider>,
    document.getElementById('app')

);