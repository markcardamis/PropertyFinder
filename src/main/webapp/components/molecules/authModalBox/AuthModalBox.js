import React from 'react'
import PropTypes from 'prop-types'

import './authModalBox.scss'

const AuthModalBox = props => {
    return (
        <div className='authModalBox'>
            <div className='authModalTop'/>
            <div className='authModalTopInner'/>
            {props.children}
        </div>
    )
}

AuthModalBox.propTypes = {
    children: PropTypes.any
}

export default AuthModalBox


