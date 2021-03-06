import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, connect } from "react-redux";
import "./searchInput.scss";
import { getSearchResults } from "../../../store/actions/searchAction";

const SearchInput = props => {
    const searchResults = useSelector(state=>state.searchResults);
    const [ hovered, setHovered ] = useState("");
    
    const handleHover = (item) => {
        props.onHover(item);
        setHovered(item);
    };
    const handleKeyDown = (e) => {
        const hoveredIndex = () => searchResults.findIndex(item=>item.propertyId==hovered.propertyId);

        if (e.key==="Enter") {
            hovered == "" ? null : props.onSelect(hovered);
        } else if (e.key==="ArrowUp") {
            hovered == "" ? setHovered(searchResults[searchResults.length-1]) :
            hovered.propertyId == searchResults[0].propertyId ? 
            setHovered(searchResults[searchResults.length-1]) : setHovered(searchResults[hoveredIndex()-1]);
        } else if (e.key==="ArrowDown") {
            hovered == "" ? setHovered(searchResults[0]) :
            hovered.propertyId === searchResults[(searchResults.length)-1].propertyId ? 
            setHovered(searchResults[0]) : setHovered(searchResults[hoveredIndex()+1]);
        } else if (props.search.length>=60) {
            e.preventDefault();
        }
    };
    const renderSearchResults = () => {
        return searchResults.map(item=>{
            return <div 
                        key={item.propertyId}
                        className={`searchResultItem ${hovered.propertyId===item.propertyId ? "hovered" : ""}`}
                        onMouseOver={()=>handleHover(item)}
                        onClick={()=>props.onSelect(item)}
                        >
                            {item.address}
                    </div>;
        });
    };

    return (
            <div>
                <input
                    autoFocus
                    placeholder={props.placeholder}
                    value={props.search}
                    onChange={props.onChange}
                    className='searchInput'
                    onKeyUp={props.onKeyUp}
                    onKeyPress={props.onKeyPress}
                    onKeyDown={handleKeyDown}
                    onFocus={()=>props.setShowResults(true)}
                    />
                <span className='clearSearch' onClick={props.onCancel}>x</span>
                {props.showResults&&searchResults.length>0&&<div 
                    className='searchResults'
                    onKeyDown={(e)=>handleKeyDown(e)}
                    >
                    {renderSearchResults()}
                </div>}
            </div>
    );
};

SearchInput.propTypes = {
    onChange: PropTypes.func,
    onCancel: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyPress: PropTypes.func,
    search: PropTypes.string,
    placeholder: PropTypes.string,
    setShowResults: PropTypes.func,
    onHover: PropTypes.func,
    onSelect: PropTypes.func,
    showResults: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
    
    };
};

const mapDispatchToProps = {
    getSearchResults
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
