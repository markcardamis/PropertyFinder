import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import Loader from 'react-loader-spinner';
import {useSelector} from 'react-redux'

import Home from './Home';
import LoginPage from '../pages/LoginPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage'
import '../styles/style.scss';
import variables from '../styles/_variables.scss'

function onAuthRequired({history}) {
  history.push('/login');
}

const App = () => {

    return (
      <>
      {useSelector(state=>state.loadingIndicator)&&<div className='loadingIndicatorContainer'>
        <Loader 
          type="TailSpin" 
          color={variables.green} 
          height={80} 
          width={80} />
          {/* <div className='loadingIndicator'>
            <Loader type="TailSpin" color={variables.white} height={80} width={80} />
          </div> */}
      </div>}
        <Router>
          <Security issuer='https://dev-842802.okta.com/oauth2/default'
                    clientId='0oa1phknm1QbQZjCh357'
                    redirectUri={window.location.origin + '/implicit/callback'}
                    onAuthRequired={onAuthRequired}
                    scopes={['openid profile email']}
                    pkce={true} >
            <Route path='/' exact={true} component={Home} />
            <Route path='/login' exact component={LoginPage} />
            <Route path='/about' exact component={AboutPage} />
            <Route path='/contact' exact component={ContactPage} />
            <Route path='/implicit/callback' component={ImplicitCallback} />
            <Route path='/map' exact component={Map} />
          </Security>
        </Router>
      </>
    );
}

export default App;