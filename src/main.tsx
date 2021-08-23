import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { theme } from './theme';
import { ThemeProvider } from 'theme-ui';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphqlClient';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Auth0Provider
        domain="dev-zah-ux2d.us.auth0.com"
        clientId="4yMX6dqD1oA1neSRXsvltagqXJ8DGuJQ"
        redirectUri={window.location.origin}
        audient={'https://project-dusk.vercel.app/api'}
        scope={'read:all'}
      >
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Auth0Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
