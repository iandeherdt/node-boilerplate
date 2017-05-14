import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
    ),
    preloadedState,
  )
}