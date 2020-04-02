import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import {Button} from '@material-ui/core';

export default withAuth(
  class RegistrationForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sessionToken: null,
        errorMessage: ''
      };
      
      this.oktaAuth = new OktaAuth({ url: props.baseUrl });
      this.checkAuthentication();
    }

    checkAuthentication = async () => {
      const sessionToken = await this.props.auth.getIdToken();
      if (sessionToken) {
        this.setState({ sessionToken });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    handleChange = (e) => {
      const { id, value } = e.target;
      this.setState({
        [id]: value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();

      fetch('/api/account', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(user => {
        this.oktaAuth.signIn({
          username: this.state.email,
          password: this.state.password
        })
        .then(res =>
          this.setState({
            sessionToken: res.sessionToken
          }))
      })
      .catch(err => {
        console.log(err.message);
        this.setState({errorMessage: err.message});
      })
    }
    
    render () {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      return (
        <div>
          { this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3> }
          <form className='loginForm' onSubmit={this.handleSubmit}>
            <label>First Name:</label>  
            <input
              className='formInput'
              id="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <label>Last Name:</label>
            <input
              className='formInput'
              id="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <label>Email:</label>
            <input
              className='formInput'
              id="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label>Password:</label>
            <input
              className='formInput'
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div className='registerBtn'>
              <Button 
                variant="contained" 
                color="secondary"
                className='formInput'
                id="submit"
                type="submit"
                value="Register"
                >Register</Button>
            </div>
          </form>
        </div>
      );
    }
  }
);