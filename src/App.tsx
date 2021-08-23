import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { Heading, ThemeProvider } from 'theme-ui';
import { theme } from './theme';
import { Logo } from './Logo';
import { FadeInText } from './FadeInText';
import { LoginButton } from './Login/LoginButton';

const App = () => (
  <Auth0Provider
    domain="dev-zah-ux2d.us.auth0.com"
    clientId="4yMX6dqD1oA1neSRXsvltagqXJ8DGuJQ"
    redirectUri={window.location.origin}
    audient={'https://project-dusk.vercel.app/api'}
    scope={'read:all'}
  >
    <ThemeProvider theme={theme}>
      <header
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Logo />
        <Heading as="h1" sx={{ fontSize: 7 }}>
          Project Dusk
        </Heading>
        <Heading as="h2">
          <FadeInText>Coming soon...</FadeInText>
        </Heading>
        <LoginButton />
      </header>
    </ThemeProvider>
  </Auth0Provider>
);

export default App;
