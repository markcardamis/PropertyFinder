import React from 'react'
import PropTypes from 'prop-types'
import AuthModalBox from '../../molecules/authModalBox/AuthModalBox'
import LoginForm from '../../molecules/loginForm/LoginForm'
import AuthModalAccount from '../../molecules/authModalAccount/AuthModalAccount'
import AuthModalRegister from '../../molecules/authModalRegister/AuthModalRegister'

const AuthModal = props => {
    return (
        <div>
            <AuthModalBox>
                <LoginForm/>
                {/* <AuthModalAccount/> */}
                {/* <AuthModalRegister/> */}
            </AuthModalBox>
        </div>
    )
}

AuthModal.propTypes = {

}

export default AuthModal
