import React from "react";
import Fade from "react-reveal/Fade";
import "./searchModal.scss";
import SearchItem from "../../molecules/searchItem/SearchItem";
import { useSelector, useDispatch } from "react-redux";
import { IconCloseMobile } from "../../../assets/icons";

const SearchModal = () => {
    const properties = useSelector(state=>state.mapMarker.markers);
    const dispatch = useDispatch();

    const renderResults = () => {
        return properties.map((item,index)=>{
            return <SearchItem
                        key={index}
                        marker={item}
                    />;
        });
    };
    return (
        <Fade>
            <div className='searchModalContainer'>
                <div className='searchModal'>
                    <div className='searchModalHeader'>
                        {properties&&properties.length} Properties
                        <div className='searchHeaderClose' onClick={()=>dispatch({ type: "CLOSE_SEARCH_MODAL" })}>
                           <IconCloseMobile size={0.8}/>
                        </div>
                    </div>
                        <div className='searchListContainer'>{renderResults()}</div>
                </div>
            </div>
        </Fade>
    );
};

export default SearchModal;
