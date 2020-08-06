import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux'
import ButtonSquare from '../../atoms/buttonSquare/ButtonSquare';
import {IconFilter2, IconFilter2Mobile, IconMenu2, IconMenu2Mobile, IconClose, IconCloseMobile, IconLayers} from '../../../assets/icons';
import './filterButtonGroup.scss';

const FilterButtonGroup = props => {
    const searchModal = useSelector(state=>state.searchModal)
    return (
        <div className='filterButtonGroup'>
            <div className='resultsButton'><ButtonSquare icon={searchModal ? <IconClose/> : <IconMenu2/>} onClick={props.onMenuClick}/></div>
            <div className='resultsButtonMobile'><ButtonSquare icon={searchModal ? <IconCloseMobile/> : <IconMenu2Mobile/>} onClick={props.onMenuClick}/></div>
            <div className='filterButton'><ButtonSquare icon={<IconFilter2 color={'#000000'}/>} onClick={props.onFilterClick}/></div>
            <div className='filterButtonMobile'><ButtonSquare icon={<IconFilter2Mobile color={'#000000'}/>} onClick={props.onFilterClick}/></div>
            <ButtonSquare icon={<IconLayers/>} color={'#000000'} onClick={props.onLayersClick}/>
        </div>
    );
};

FilterButtonGroup.propTypes = {
    onMenuClick: PropTypes.func,
    onFilterClick: PropTypes.func
};

export default FilterButtonGroup;
