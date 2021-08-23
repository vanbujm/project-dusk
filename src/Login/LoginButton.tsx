import React, { useCallback, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, logout, getAccessTokenWithPopup, user } =
    useAuth0();
  const [authToken, setAuthToken] = useState<null | string>();

  const createPlayer = useCallback(async () => {
    const opts = {
      audience: 'https://project-dusk.vercel.app/api',
      scope: 'read:all',
    };
    try {
      setAuthToken(await getAccessTokenSilently(opts));
    } catch (e) {
      if (e.error === 'consent_required') {
        setAuthToken(await getAccessTokenWithPopup(opts));
      }
      throw e;
    }
  }, [getAccessTokenSilently, logout]);

  if (isAuthenticated && authToken) {
    (async () => {
      console.log(user);
      try {
        const response = await fetch('https://project-dusk.vercel.app/api/createPlayer', {
          mode: 'cors',
          headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }
  if (isAuthenticated && !authToken) {
    createPlayer();
  }
  if (isAuthenticated) {
    return <button onClick={logout as any}>Log Out</button>;
  }

  return <button onClick={loginWithRedirect}>Log In</button>;
};
