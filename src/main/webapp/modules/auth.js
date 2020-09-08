import { useState, useEffect } from "react";

export const useAuth = auth => {
  const [authenticated, setAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    console.log(auth.getAccessToken());
    auth.isAuthenticated().then(isAuthenticated => {
      if (isAuthenticated !== authenticated) {
        setAuthenticated(isAuthenticated);
      }
    });
  });

  useEffect(() => {
    if (authenticated) {
      auth.getUser().then(setUser);
      auth.getAccessToken().then(setAccessToken);
    } else {
      setUser(null);
      setAccessToken(null);
    }
  }, [authenticated]);

  return [authenticated, user, accessToken];
};