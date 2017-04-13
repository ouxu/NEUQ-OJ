import React from 'react'
import ReactDOM from 'react-dom'
// 引入redux
import { Provider } from 'react-redux'
import configStore from './stores'
import RouterApp from './router/'
const store = configStore()

ReactDOM.render(
  <Provider store={store}>
    {RouterApp(store)}
  </Provider>,
  document.getElementById('app'),
)
