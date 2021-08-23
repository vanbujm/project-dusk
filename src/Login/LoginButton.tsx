import React, { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, logout, getAccessTokenWithPopup } = useAuth0();

  const createPlayer = useCallback(async () => {
    let token;
    const opts = {
      audience: 'https://project-dusk.vercel.app/api',
      scope: 'read:all',
    };
    try {
      token = await getAccessTokenSilently(opts);
    } catch (e) {
      if (e.error === 'consent_required') {
        console.log('popup');
        token = await getAccessTokenWithPopup(opts);
        console.log('popup token', token);
      }
      throw e;
    }

    try {
      const response = await fetch('https://project-dusk.vercel.app/api/createPlayer', {
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }, [getAccessTokenSilently, logout]);

  if (isAuthenticated) {
    createPlayer();
    return <button onClick={logout}>Log Out</button>;
  }

  return <button onClick={loginWithRedirect}>Log In</button>;
};
