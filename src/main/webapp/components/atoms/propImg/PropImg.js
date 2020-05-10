import React from 'react'
import PropTypes from 'prop-types'

import './propImg.scss'

const PropImg = props => {
    return (
        <div>
            <img src={props.img} className='propImg'/>
        </div>
    )
}

PropImg.propTypes = {
    img: PropTypes.string
}

export default PropImg
