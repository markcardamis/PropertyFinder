import React from 'react'
import PropTypes from 'prop-types'
import variables from '../../../styles/_variables.scss'

import './propListTitle.scss'

const PropListTitle = props => {
    return (
        <div className='propListTitle'>
            {props.icon&&<span className='propListTitle-icon'>{props.icon}</span>}
            {props.title&&<div className='propListTitle-text' style={{color: props.color ? props.color : variables.darkGrey}}>{props.title}</div>}
            {props.title22&&<div className='propListTitle-text22' style={{color: props.color ? props.color : variables.darkGrey}}>{props.title22}</div>}
        </div>
    )
}

PropListTitle.propTypes = {
    icon: PropTypes.any,
    title: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string
}

export default PropListTitle
