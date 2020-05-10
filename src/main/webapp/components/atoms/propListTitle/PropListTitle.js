import React from 'react'
import PropTypes from 'prop-types'

import './propListTitle.scss'

const PropListTitle = props => {
    return (
        <div className='propListTitle'>
            {props.icon&&<span className='propListTitle-icon'>{props.icon}</span>}
            <div className='propListTitle-text'>{props.title}</div>
        </div>
    )
}

PropListTitle.propTypes = {
    icon: PropTypes.any,
    title: PropTypes.string
}

export default PropListTitle
