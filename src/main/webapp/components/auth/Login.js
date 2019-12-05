import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';


class Login extends Component {

    handleAuthenticated = () => {
      this.props.dispatch({type: 'AUTHENTICATED'})
    };

    handleNotAuthenticated = () => {
      this.props.dispatch({type: 'NOT_AUTHENTICATED'})
    };

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
    
      authenticated ? this.handleAuthenticated() : this.handleNotAuthenticated();
    }
  
  componentDidMount() {
    this.checkAuthentication();
    console.log(this.props)
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if ( this.props.login.authentication === null ) return null;

    return this.props.login.authentication ?
       <Redirect to={{ pathname: '/' }}/> :
      <LoginForm baseUrl={this.props.baseUrl} />;
  }
}

const mapStateToProps = (state) => {
  return {
      login: state
  };
};

export default withAuth(connect(mapStateToProps)(Login));
