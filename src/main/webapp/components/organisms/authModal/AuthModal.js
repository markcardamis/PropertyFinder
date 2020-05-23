import React from 'react'
import PropTypes from 'prop-types'
import AuthModalBox from '../../molecules/authModalBox/AuthModalBox'
import AuthModalLogin from '../../molecules/authModalLogin/AuthModalLogin'

const AuthModal = props => {
    return (
        <div>
            <AuthModalBox>
                <AuthModalLogin/>
            </AuthModalBox>
        </div>
    )
}

AuthModal.propTypes = {

}

export default AuthModal
