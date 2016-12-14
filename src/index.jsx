import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Application from './components/application';

import AppState from './state/application-state'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { reducer } from './redux/'
import { increaseDate, fetchEntries } from './redux/actions'

import './index.css'
import 'bootswatch/cosmo/bootstrap.min.css'

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
)

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(fetchEntries())
// store.dispatch(increaseDate())
// store.dispatch({ type: 'INCREASE_DATE' })
// store.dispatch({ type: 'INCREASE_DATE' })
// unsubscribe()

useStrict(true)
const appState = new AppState()

render(
  <AppContainer>
    <ReduxProvider store={store}>
      <Provider state={appState}>
        <Application />
      </Provider>
    </ReduxProvider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/application/', () => {
    const NextApp = require('./components/application/').default;

    render(
      <AppContainer>
        <NextApp state={appState} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
