import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, connect} from 'react-redux'
import ButtonSquare from '../../atoms/buttonSquare/ButtonSquare';
import {IconFilter2, IconMenu2, IconClose, IconLayers, IconSearch} from '../../../assets/icons';
import './filterButtonGroup.scss';
import { useWindowSize } from '../../../modules/windowSize';
import { getSearchResults } from '../../../store/actions/searchAction';
import { getPopup } from '../../../store/actions/popupAction';
import SearchInput from '../../atoms/searchInput/SearchInput';

const FilterButtonGroup = props => {
    const searchModal = useSelector(state=>state.searchModal)
    const windowSize = useWindowSize()
    const [showSearchInput, setSearchInput] = useState(false);
    const [search, setSearch] = useState('');
    const [hovered, setHovered] = useState({})
    const [selected, setSelected] = useState({})
    let timer;
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleCancelSearch = () => {
        setSearchInput(false);
        setSearch('')
    }
    const handleKeyUp = (e) => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
        props.getSearchResults(search)
        }, 500);
      }
    const handleKeyPress = (e) => {
        window.clearTimeout(timer);
      }
    const handleSelect = (item) => {
        handleCancelSearch;
        setSelected(item);
        props.getPopup(item.propertyId, ['lat', 'long'])
    }
    const handleHover = (item) => {
        setHovered(item)
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
            {!showSearchInput ? 
                <ButtonSquare 
                    icon={<IconSearch size={windowSize.width<982 ? 2 : 1}/>} 
                    color={'#000000'} 
                    onClick={()=>setSearchInput(true)}
                    /> :
                <SearchInput
                    search={search}
                    onChange={(e)=>handleSearch(e)}
                    onCancel={handleCancelSearch}
                    onHover={handleHover}
                    onSelect={handleSelect}
                    onKeyPress={handleKeyPress}
                    onKeyUp={handleKeyUp}
                />
                }
        </div>
    );
};

FilterButtonGroup.propTypes = {
    onMenuClick: PropTypes.func,
    onFilterClick: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
    
    };
};

const mapDispatchToProps = {
    getSearchResults,
    getPopup
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterButtonGroup);
