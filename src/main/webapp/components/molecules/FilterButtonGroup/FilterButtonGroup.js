import React from 'react'
import PropTypes from 'prop-types'
import ButtonSquare from '../../atoms/buttonSquare/ButtonSquare'
import {IconFilter2, IconMenu} from '../../../assets/icons'

import './filterButtonGroup.scss'

const FilterButtonGroup = props => {
    return (
        <div className='filterButtonGroup'>
            <ButtonSquare icon={<IconMenu/>} onClick={props.onMenuClick}/>
            <ButtonSquare icon={<IconFilter2 color={'#000000'}/>} onClick={props.onFilterClick}/> 
        </div>
    )
}

FilterButtonGroup.propTypes = {
    onMenuClick: PropTypes.func,
    onFilterClick: PropTypes.func
}

export default FilterButtonGroup
