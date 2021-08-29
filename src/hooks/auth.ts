import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

export const useAuthWithAutoLogin = () => {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [authToken, setAuthToken] = useState<null | string>();

  useEffect(() => {
    (async () => {
      const opts = {
        audience: 'https://project-dusk.vercel.app/api',
        scope: 'read:all',
      };
      try {
        setAuthToken(await getAccessTokenSilently(opts));
      } catch (e: any) {
        if (e.error === 'consent_required') {
          setAuthToken(await getAccessTokenWithPopup(opts));
        }
        throw e;
      }
    })();
  }, [setAuthToken, getAccessTokenWithPopup, getAccessTokenSilently]);

  return {
    authToken,
  };
};
