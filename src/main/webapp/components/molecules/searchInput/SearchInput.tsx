import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./searchInput.scss";

export interface SearchInputProps {
    onHover: (item) => void;
    onSelect: (item) => void;
    onChange: () => void;
    onCancel: () => void;
    onKeyUp: () => void;
    onKeyPress: () => void;
    search: string,
    placeholder: string,
    setShowResults: (val: boolean) => void;
    showResults: () => void;
};

const SearchInput = ({ 
    onHover, 
    onSelect,  
    onChange,
    onCancel,
    onKeyUp,
    onKeyPress,
    search,
    placeholder,
    setShowResults,
    showResults 
}: SearchInputProps) => {
    const searchResults = useSelector(state=>state.searchResults);
    const [ hovered, setHovered ] = useState<{ propertyId: string }>("");
    
    const handleHover = (item) => {
        onHover(item);
        setHovered(item);
    };
    const handleKeyDown = (e) => {
        const hoveredIndex = () => searchResults.findIndex(item=>item.propertyId==hovered.propertyId);

        if (e.key==="Enter") {
            hovered == "" ? null : onSelect(hovered);
        } else if (e.key==="ArrowUp") {
            hovered == "" ? setHovered(searchResults[searchResults.length-1]) :
            hovered.propertyId == searchResults[0].propertyId ? 
            setHovered(searchResults[searchResults.length-1]) : setHovered(searchResults[hoveredIndex()-1]);
        } else if (e.key==="ArrowDown") {
            hovered == "" ? setHovered(searchResults[0]) :
            hovered.propertyId === searchResults[(searchResults.length)-1].propertyId ? 
            setHovered(searchResults[0]) : setHovered(searchResults[hoveredIndex()+1]);
        } else if (search.length>=60) {
            e.preventDefault();
        }
    };
    const renderSearchResults = () => {
        return searchResults.map(item=>{
            return <div 
                        key={item.propertyId}
                        className={`searchResultItem ${hovered.propertyId===item.propertyId ? "hovered" : ""}`}
                        onMouseOver={()=>handleHover(item)}
                        onClick={()=> onSelect(item)}
                        >
                            {item.address}
                    </div>;
        });
    };

    return (
            <div>
                <input
                    autoFocus
                    placeholder={placeholder}
                    value={search}
                    onChange={onChange}
                    className='searchInput'
                    onKeyUp={onKeyUp}
                    onKeyPress={onKeyPress}
                    onKeyDown={handleKeyDown}
                    onFocus={()=>setShowResults(true)}
                    />
                <span className='clearSearch' onClick={onCancel}>x</span>
                {showResults&&searchResults.length>0&&<div 
                    className='searchResults'
                    onKeyDown={(e)=>handleKeyDown(e)}
                    >
                    {renderSearchResults()}
                </div>}
            </div>
    );
};

export default SearchInput;
