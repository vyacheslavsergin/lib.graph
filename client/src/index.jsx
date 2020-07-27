import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import 'materialize-css/dist/js/materialize.js'
import 'materialize-css/sass/materialize.scss'
import 'normalize.css'

import rootReducer from './__data__/reducers/root-reducer.js'
import {sagaWatcher} from './__data__/sagas'

import App from './app/app/app-component'

import './index.scss'

const saga = createSagaMiddleware()

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(saga)
  )
)

saga.run(sagaWatcher)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.root')
)
