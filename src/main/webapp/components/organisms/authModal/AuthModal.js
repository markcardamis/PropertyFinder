import React from 'react'
import PropTypes from 'prop-types'
import AuthModalBox from '../../molecules/authModalBox/AuthModalBox'
import AuthModalLogin from '../../molecules/authModalLogin/AuthModalLogin'
import AuthModalAccount from '../../molecules/authModalAccount/AuthModalAccount'
import AuthModalRegister from '../../molecules/authModalRegister/AuthModalRegister'

const AuthModal = props => {
    return (
        <div>
            <AuthModalBox>
                {/* <AuthModalLogin/> */}
                {/* <AuthModalAccount/> */}
                <AuthModalRegister/>
            </AuthModalBox>
        </div>
    )
}

AuthModal.propTypes = {

}

export default AuthModal
