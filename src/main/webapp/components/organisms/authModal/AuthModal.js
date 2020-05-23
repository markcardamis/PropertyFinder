import React from 'react'
import PropTypes from 'prop-types'
import AuthModalBox from '../../molecules/authModalBox/AuthModalBox'
import AuthModalLogin from '../../molecules/authModalLogin/AuthModalLogin'
import AuthModalAccount from '../../molecules/authModalAccount/AuthModalAccount'

const AuthModal = props => {
    return (
        <div>
            <AuthModalBox>
                {/* <AuthModalLogin/> */}
                <AuthModalAccount/>
            </AuthModalBox>
        </div>
    )
}

AuthModal.propTypes = {

}

export default AuthModal
