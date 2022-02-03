import { useState, useEffect } from "react";
import { useOktaAuth } from '@okta/okta-react';

export const useAuth = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      oktaAuth.getUser().then(setUser);
    } else {
      setUser(null);
    }
  }, [ authState ]);

  return { 
    isAuthenticated: authState?.isAuthenticated, 
    user, 
    accessToken: authState?.accessToken?.accessToken
  };
};