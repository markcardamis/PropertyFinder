import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom'
import { Security, ImplicitCallback, SecureRoute } from '@okta/okta-react';
import Home from './Home';
import '../styles/main.css';

class App extends Component {
    render() {
      return (

        <HashRouter>
            <Security 
                issuer='https://dev-842802.okta.com/oauth2/default'
                clientId='0oa1kjz045rSwS4lB357'
                redirectUri={window.location.origin + '/implicit/callback'}
                pkce={true} 
            >
            <Route path='/' exact={true} component={Home}/>
            <Route path='/implicit/callback' component={ImplicitCallback}/>
          </Security>   
        </HashRouter>

      );
    }
  }
  
  export default App;