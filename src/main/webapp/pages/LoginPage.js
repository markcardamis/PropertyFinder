import React, { Component } from 'react';
import Login from '../components/auth/Login';

class LoginPage extends Component {
    render() {
        return (
            <div className='row col-lg-12 justify-content-center'>
                <div className='login col-lg-3'>
                 <Login baseUrl='https://dev-842802.okta.com' />
                </div>
            </div>
        )
    }

}
    export default LoginPage;