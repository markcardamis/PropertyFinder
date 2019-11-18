import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Filter';
import Login from '../auth/Login'

class SignIn extends Component {
    render () {
        return (
            <div className='signinWidget' style={{display: this.props.displaySignIn}}>
                <Login baseUrl='https://dev-842802.okta.com' />
                <hr/>
                <p>Not registered? <Link to='/login'>Create an account</Link></p>
            </div>
        )
    }
}

export default SignIn;