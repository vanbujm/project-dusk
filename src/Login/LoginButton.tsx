import React, { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const createPlayer = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const response = await fetch('https://project-dusk.vercel.app/api/createPlayer', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: token,
      },
    });
    const data = await response.json();
    console.log(data);
  }, [getAccessTokenSilently]);

  if (isAuthenticated) {
    createPlayer();
    return null;
  }

  return <button onClick={loginWithRedirect}>Log In</button>;
};
