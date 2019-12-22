import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

export default withAuth(
  class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sessionToken: null,
        data: null,
        username: '',
        password: '',
        errorMessage: ''
      };
      this.oktaAuth = new OktaAuth({ url: props.baseUrl });
    }

  handleSubmit = async (e) => {
      e.preventDefault();

      this.oktaAuth.signIn({
        username: this.state.username,
        password: this.state.password
      })
      .then(res => this.setState({
        sessionToken: res.sessionToken
      }))
      .catch(err => {
        this.setState({errorMessage: err.errorSummary});
        console.log(err.statusCode + ' error', err);
      })
    }

    handleChange = (e) => {
      const { id, value } = e.target;
      this.setState({
        [id]: value
      })
    }

    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({sessionToken: this.state.sessionToken});
        return null;
      }

      return (
        <div>
          { this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3> }
          <form className='loginForm' onSubmit={this.handleSubmit}>
            <label>Username:</label>
            <input
              className='formInput'
              id="username"
              type="text"
              value={this.state.username}
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
            <input className='formInput' id="submit" type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
);
