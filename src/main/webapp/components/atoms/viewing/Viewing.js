import React from 'react'
import PropTypes from 'prop-types'
import './viewing.scss'
import { IconEye } from '../../../assets/icons'

const Viewing = props => {
    return (
        <div className='viewing'>
            <IconEye/>
            {props.children}
        </div>
    )
}

Viewing.propTypes = {
    active: PropTypes.bool
}

export default Viewing
