import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'theme-ui';
import { theme } from './theme';
import App from './App';
import store from './state/store';
import './assets/_fonts.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const domain = window.env.AUTH0_DOMAIN;
const clientId = window.env.AUTH0_CLIENTID;
const audience = window.env.AUTH0_AUDIENCE;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={audience}
    onRedirectCallback={() => {
      const dataString = localStorage.getItem('auth_redirect_data');
      if (dataString) {
        localStorage.removeItem('auth_redirect_data');
        const data = JSON.parse(dataString);
        history.replace(data.pathname || window.location.pathname);
      }
    }}
  >
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root'),
);
