import React from 'react'
import PropTypes from 'prop-types'
import './savedFilterItem.scss'

const SavedFilterItem = props => {
    return (
        <>
        {props.value&&<div className='savedFilterItem'>
            {props.icon}
            <div className='savedFilterItemTitle'>{props.title}</div>
            <div className='savedFilterItemValue'>{props.value}</div>
            {props.position!=='last' && <div className='savedFilterItemDevider'/>}
        </div>}
        </>
    )
}

SavedFilterItem.propTypes = {

}

export default SavedFilterItem
