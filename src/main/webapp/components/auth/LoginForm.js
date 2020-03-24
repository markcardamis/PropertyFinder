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
        console.log(err.errorSummary);
        this.setState({errorMessage: err.errorSummary});
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
            <label className='inputLabel'>Username:</label>
            <input
              className='formInput'
              id="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <label className='inputLabel'>Password:</label>
            <input
              className='formInput'
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input className='formBtn' id="submit" type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
);
