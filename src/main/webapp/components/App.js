import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import '../styles/main.css';

function onAuthRequired({history}) {
  history.push('/login');
}

class App extends Component {
  render() {
    return (
      <Router>
        <Nav/>
        <Security issuer='https://dev-842802.okta.com/oauth2/default'
                  clientId='0oa1kjz045rSwS4lB357'
                  redirectUri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired}
                  pkce={true} >
          <Route path='/' exact={true} component={Home} />
          <Route path='/login' render={() => <Login baseUrl='https://dev-842802.okta.com' />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
      </Router>
    );
  }
}

export default App;