import React from 'react'
import PropTypes from 'prop-types'

import './propListTitle.scss'

const PropListTitle = props => {
    return (
        <div className='propListTitle'>
            {props.icon&&props.icon}
            <div className='propListTitle-text'>{props.title}</div>
        </div>
    )
}

PropListTitle.propTypes = {
    title: PropTypes.string
}

export default PropListTitle
