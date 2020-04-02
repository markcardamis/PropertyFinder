import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';

import Home from './Home';
import Nav from './nav/Nav';
import LoginPage from '../pages/LoginPage';
import '../styles/style.scss';

function onAuthRequired({history}) {
  history.push('/login');
}

class App extends Component {
  render() {
    return (
        <Router>
          <Nav/>
          <Security issuer='https://dev-842802.okta.com/oauth2/default'
                    clientId='0oa1phknm1QbQZjCh357'
                    redirectUri={window.location.origin + '/implicit/callback'}
                    onAuthRequired={onAuthRequired}
                    scopes={['openid profile email']}
                    pkce={true} >
            <Route path='/' exact={true} component={Home} />
            <Route path='/login' exact component={LoginPage} />
            <Route path='/implicit/callback' component={ImplicitCallback} />
            <Route path='/map' exact component={Map} />
          </Security>
        </Router>
    );
  }
}

export default App;