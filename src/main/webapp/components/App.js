import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import Protected from './Protected';
import PropertyInformation from './PropertyInformation';
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
                  clientId='0oa1phknm1QbQZjCh357'
                  redirectUri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired}
                  scopes={['openid profile email']}
                  pkce={true} >
          <Route path='/' exact={true} component={Home} />
          <SecureRoute path='/protected' component={Protected} />
          <SecureRoute path='/propertyinformation' component={PropertyInformation} />
          <Route path='/login' render={() => <Login baseUrl='https://dev-842802.okta.com' />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
          <Route path='/map' exact component={Map} />
        </Security>
      </Router>
    );
  }
}

export default App;