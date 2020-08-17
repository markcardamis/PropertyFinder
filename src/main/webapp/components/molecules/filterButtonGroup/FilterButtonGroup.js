import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux'
import ButtonSquare from '../../atoms/buttonSquare/ButtonSquare';
import {IconFilter2, IconMenu2, IconClose, IconLayers, IconSearch} from '../../../assets/icons';
import './filterButtonGroup.scss';
import { useWindowSize } from '../../../modules/windowSize';
import TextInput from '../../atoms/textInput/TextInput';

const FilterButtonGroup = props => {
    const searchModal = useSelector(state=>state.searchModal)
    const windowSize = useWindowSize()
    const [showSearchInput, setSearchInput] = useState(false);
    const [search, setSearch] = useState('')

    const handleCancelSearch = () => {
        setSearchInput(false);
        setSearch('')
    }
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
                style={{marginRight: 14}}
                onClick={props.onLayersClick}
                />
                {console.log(search)}
            {!showSearchInput ? <ButtonSquare 
                icon={<IconSearch size={windowSize.width<982 ? 2 : 1}/>} 
                color={'#000000'} 
                onClick={()=>setSearchInput(true)}
                /> :
                <>
                    <input
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        className='searchInput'
                        />
                    <span className='clearSearch' onClick={handleCancelSearch}>x</span>
                </>
                }
        </div>
    );
};

FilterButtonGroup.propTypes = {
    onMenuClick: PropTypes.func,
    onFilterClick: PropTypes.func
};

export default FilterButtonGroup;
