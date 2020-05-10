import React from 'react'
import PropTypes from 'prop-types'

import './propListItem.scss'
import PropListTitle from '../../atoms/propListTitle/PropListTitle'

const PropListItem = props => {
    return (
        <div className='propListTitle'>
            <PropListTitle icon={props.icon} title={props.title}/>
            <div className='propListTitle-value'>
                {props.value11&&<span className='font11'>{props.value11}</span>}
                {props.value14&&<span className='font14'>{props.value14}</span>}
                {props.value18&&<span className='font18'>{props.value18}</span>}
            </div>
        </div>
    )
}

PropListItem.propTypes = {
    title: PropTypes.string,
    value11: PropTypes.any, 
    value14: PropTypes.any, 
    value18: PropTypes.any, 
    icon: PropTypes.any
}

export default PropListItem
