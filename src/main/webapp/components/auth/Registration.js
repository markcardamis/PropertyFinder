import React from 'react';

class Registration extends React.Component {
    render () {
        return (
            <div className='container col-lg-12 justify-content-center'>
            <form className='loginForm col-sm-5 col-lg-3'>
                <label>
                    First Name:
                    <input
                    className='formInput'
                    type="text"
                    />
                    Last Name:
                    <input
                    className='formInput'
                    type="password"
                    />
                    Email:
                    <input
                    className='formInput'
                    type="password"
                    />
                    Password:
                    <input
                    className='formInput'
                    type="password"
                    />
                </label>
                <input className='formInput' type="submit" value="Register" />
            </form>
      </div>
        )
    }
}

export default Registration;