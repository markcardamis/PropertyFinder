import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Nav from './Nav'
import '../styles/main.css';



export default withAuth(class Home extends Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: false };
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();

    }  
    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
          console.log('User is authenticated!');
        } else {
        console.log('User is not authenticated');
        }
      }
    
      componentDidUpdate() {
        this.checkAuthentication();
      }

     render() {

        const button = this.state.authenticated ?

        <button className='loginButton' onClick={() => {this.props.auth.logout()}}>Logout</button> :
        <button className='loginButton' onClick={() => {this.props.auth.login()}}>Login</button>;

        return (
            <div className='home'>
                <Nav/>
                {button}
            </div>
        ) 
    };
})