import { useState, useEffect } from "react";
import { useOktaAuth } from '@okta/okta-react';

export const useAuth = () => {
  const { authState, authService } = useOktaAuth();
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    if (authState.isAuthenticated) {
      authService.getUser().then(setUser);
    } else {
      setUser(null);
    }
  }, [ authState.isAuthenticated ]);

  return [ authState.isAuthenticated, user, authState.accessToken ];
};