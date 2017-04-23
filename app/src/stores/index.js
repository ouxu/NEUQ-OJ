/**
 * Created by out_xu on 16/12/20.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-log'
import rootReducer from 'reducers'

const configStore = (initialState) => {
  const log = createLogger()
  const middleWare = [thunkMiddleware, log]
  const store = compose(
        applyMiddleware(...middleWare),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    )(createStore)(rootReducer, initialState)
    // 热替换
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('reducers')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}

export default configStore
