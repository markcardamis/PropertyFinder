import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux'
import ButtonSquare from '../../atoms/buttonSquare/ButtonSquare';
import {IconFilter2, IconFilter2Mobile, IconMenu2, IconClose} from '../../../assets/icons';
import './filterButtonGroup.scss';

const FilterButtonGroup = props => {
    const searchModal = useSelector(state=>state.searchModal)
    return (
        <div className='filterButtonGroup'>
            <ButtonSquare icon={searchModal ? <IconClose/> : <IconMenu2/>} onClick={props.onMenuClick}/>
            <div className='filterButton'><ButtonSquare icon={<IconFilter2 color={'#000000'}/>} onClick={props.onFilterClick}/></div>
            <div className='filterButtonMobile'><ButtonSquare icon={<IconFilter2Mobile color={'#000000'}/>} onClick={props.onFilterClick}/></div>
        </div>
    );
};

FilterButtonGroup.propTypes = {
    onMenuClick: PropTypes.func,
    onFilterClick: PropTypes.func
};

export default FilterButtonGroup;
