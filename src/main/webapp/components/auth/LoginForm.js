import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import fetch from 'isomorphic-fetch';
import './Login.css';

export default withAuth(class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      data: null,
      username: '',
      password: ''
    };

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }


  async handleSubmit(e) {
    e.preventDefault();

    this.oktaAuth.signIn({
      username: this.state.username,
      password: this.state.password
    })
    .then(res => this.setState({
      sessionToken: res.sessionToken
    }))
    .catch(err => console.log('Found an error', err));

    try {
      const response = await fetch('/api/account', {
        // headers: {
        //   Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        // }
      // const response = await fetch ('https://jsonplaceholder.typicode.com/todos/1');
      });
      const data = await response.json();
      console.dir({ data });
      localStorage.setItem('id', data.id);
      localStorage.setItem('id', data.userId);

      this.setState({ data: JSON.stringify(data) });
    } catch (err) {
      console.log('error');
      console.log('API: /account');
    }
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({sessionToken: this.state.sessionToken});
      return null;
    }

    return (
      <div className='container col-lg-12 justify-content-center'>
        <form className='loginForm col-sm-5 col-lg-3' onSubmit={this.handleSubmit}>
          <label>
          Username:
            <input
              className='formInput'
              id="username" type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange} />
            Password:
            <input
              className='formInput'
              id="password" type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange} />
          </label>
          <input className='formInput' id="submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
});
