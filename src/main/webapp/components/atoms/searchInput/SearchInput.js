import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, connect} from 'react-redux'
import './searchInput.scss';
import { getSearchResults } from '../../../store/actions/searchAction';

const SearchInput = props => {
    const searchReults = useSelector(state=>state.searchResults);
    const [hovered, setHovered] = useState({})
    const handleHover = (item) => {
        props.onHover(item);
        setHovered(item)
    }
    const handleKeyDown = (e) => {
        e.key==='Enter' ? alert('enter') : 
        e.key==='ArrowUp' ? alert('arrow up') :
        e.key==='ArrowDown' ? alert('arrow down') : alert('null')
    }
    const renderSearchResults = () => {
        return searchReults.map(item=>{
            return <div 
                        key={item.propertyId}
                        className={`searchResultItem ${hovered.propertyId===item.propertyId ? 'hovered' : ''}`}
                        onMouseOver={()=>handleHover(item)}
                        onClick={()=>props.onSelect(item)}
                        >
                            {item.address}
                    </div>
        })
    }
    return (
            <div>
                <input
                    value={props.search}
                    onChange={props.onChange}
                    className='searchInput'
                    onKeyUp={props.onKeyUp}
                    onKeyPress={props.onKeyPress}
                    />
                <span className='clearSearch' onClick={props.onCancel}>x</span>
                <div 
                    className='searchResults'
                    onKeyDown={(e)=>handleKeyDown(e)}
                    >
                    {renderSearchResults()}
                </div>
            </div>
    );
};

SearchInput.propTypes = {
    onChange: PropTypes.func,
    onCancel: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyPress: PropTypes.func,
    search: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
    
    };
};

const mapDispatchToProps = {
    getSearchResults
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
