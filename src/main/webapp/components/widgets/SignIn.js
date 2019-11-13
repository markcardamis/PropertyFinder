import React, { Component } from 'react';
import './Filter';
import Login from '../auth/Login'

class SignIn extends Component {
    render () {
        return (
            <div className='signinWidget' style={{display: this.props.displaySignIn}}>
                <Login baseUrl='https://dev-842802.okta.com' />
            </div>
        )
    }
}

export default SignIn;