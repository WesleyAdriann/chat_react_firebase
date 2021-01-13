import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/core/styles';

import App from './views/App';

import GlobalStyle from './styles/GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <GlobalStyle />
      <App />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
