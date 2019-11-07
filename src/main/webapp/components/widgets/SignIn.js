import React, { Component } from 'react';
import './Filter';

class SignIn extends Component {
    render () {
        return (
            <div className='signinWidget' style={{display: this.props.displaySignIn}}>
                <label>Username<input type='text'/></label>
                <label>Password<input type='text'/></label>
                <button>Sign In</button>
            </div>
        )
    }
}

export default SignIn;