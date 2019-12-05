import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

import './Filter';
import Login from '../auth/Login';

class SignIn extends Component {
    render () {
        return (
            <div className='signinWidget'>
                <div className='d-flex justify-content-end'>
                    <IoMdClose onClick={this.props.onClick}/>
                </div>
                <Login baseUrl='https://dev-842802.okta.com' />
                <hr/>
                <p>Not registered? <Link to='/login'>Create an account</Link></p>
            </div>
        );
    }
}

export default SignIn;