import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux'
import ButtonSquare from '../../atoms/buttonSquare/ButtonSquare';
import {IconFilter2, IconMenu2, IconClose, IconLayers} from '../../../assets/icons';
import './filterButtonGroup.scss';
import { useWindowSize } from '../../../modules/windowSize';

const FilterButtonGroup = props => {
    const searchModal = useSelector(state=>state.searchModal)
    const windowSize = useWindowSize()
    return (
        <div className='filterButtonGroup'>
            <ButtonSquare 
                icon={searchModal ? <IconClose/> : <IconMenu2 size={windowSize.width<982 ? 2 : 1}/>} 
                onClick={props.onMenuClick}
                style={{marginRight: 14}}
                />
            <ButtonSquare 
                icon={<IconFilter2 color={'#000000'} size={windowSize.width<982 ? 2.3 : 1.3}/>} 
                onClick={props.onFilterClick}
                style={{marginRight: 14}}
                />   
            <ButtonSquare 
                icon={<IconLayers size={windowSize.width<982 ? 2 : 1}/>} 
                color={'#000000'} 
                onClick={props.onLayersClick}
                />
        </div>
    );
};

FilterButtonGroup.propTypes = {
    onMenuClick: PropTypes.func,
    onFilterClick: PropTypes.func
};

export default FilterButtonGroup;
