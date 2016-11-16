import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Application from './components/application';

import AppState from './state/application-state'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'

import './index.css'
import 'bootswatch/cosmo/bootstrap.min.css'

useStrict(true)
const appState = new AppState()

render(
  <AppContainer>
    <Provider state={appState}>
      <Application />
    </Provider>
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
