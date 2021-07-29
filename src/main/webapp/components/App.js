import React, { useMemo } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, LoginCallback } from "@okta/okta-react";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";

import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import "../styles/style.scss";
import variables from "../styles/_variables.module.scss";
import { showSignIn } from "../store/actions/signInModalAction";


const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state=>state.auth.authenticated);
  const signupRoute = useMemo(() => !isAuthenticated && <Route path='/signup' exact component={Home} />, [ isAuthenticated ]);

    return (
      <>
      {useSelector(state=>state.loading)&&<div className='loadingIndicatorContainer'>
        <Loader 
          type="TailSpin" 
          color={variables.green} 
          height={80} 
          width={80} />
      </div>}
        <Router>
          <Security 
                    issuer = {process.env.OKTA_OAUTH2_ISSUER}
                    clientId= {process.env.OKTA_OAUTH2_CLIENTID}
                    redirectUri={window.location.origin + "/implicit/callback"}
                    onAuthRequired={() => dispatch(showSignIn())}
                    scopes={[ "openid profile email" ]}
                    pkce={true} >
            <Route path='/' exact={true} component={Home} />
            <Route path='/search' exact component={Home} />
            <Route path='/about' exact component={AboutPage} />
            <Route path='/contact' exact component={ContactPage} />
            <Route path='/implicit/callback' component={LoginCallback} />
            {signupRoute}
          </Security>
        </Router>
      </>
    );
};

export default App;