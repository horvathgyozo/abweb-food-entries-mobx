import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Application from './components/application';

import 'bootswatch/cosmo/bootstrap.min.css'

render(
  <AppContainer>
    <Application />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/application/', () => {
    const NextApp = require('./components/application/').default;

    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
