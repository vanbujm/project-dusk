import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { theme } from './theme';
import { ThemeProvider } from 'theme-ui';
import { useAuthenticatedApolloClient } from './graphqlClient';
import { ApolloProvider } from '@apollo/client';

const AuthWrapper = () => {
  const client = useAuthenticatedApolloClient();
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

const Wrapper = () => (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Auth0Provider
        domain="dev-zah-ux2d.us.auth0.com"
        clientId="4yMX6dqD1oA1neSRXsvltagqXJ8DGuJQ"
        redirectUri={window.location.origin}
        audient={'https://project-dusk.vercel.app/api'}
        scope={'read:all'}
      >
        <AuthWrapper />
      </Auth0Provider>
    </ThemeProvider>
  </React.StrictMode>
);

ReactDOM.render(<Wrapper />, document.getElementById('root'));
