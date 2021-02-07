import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, connect } from "react-redux";
import { withAuth } from "@okta/okta-react";

import ButtonSquare from "../../atoms/buttonSquare/ButtonSquare";
import { LogoBlack, IconLayers, IconSearch } from "../../../assets/icons";
import "./filterButtonGroup.scss";
import { useWindowSize } from "../../../modules/windowSize";
import { getSearchResults } from "../../../store/actions/searchAction";
import { getPopup } from "../../../store/actions/popupAction";
import SearchInput from "../searchInput/SearchInput";
import { map } from "../../organisms/map/MapGL";
import ToggleWidget from "../toggleWidget/ToggleWidget";
import { useAuth } from "../../../modules/auth";
import { applyFilter } from "../../../store/actions/mapMarkerAction";
import { LATITUDE_DIFF } from "../../../shared/constants/constants";
import { removeMapPopup } from "../../../shared/utils/removeMapPopup";

const FilterButtonGroup = withAuth(props => {
    const searchModal = useSelector(state=>state.searchModal);
    const propertyModal = useSelector(state=>state.propertyModal.isHidden);
    const windowSize = useWindowSize();
    const [ showSearchInput, setSearchInput ] = useState(false);
    const [ search, setSearch ] = useState("");
    const [ hovered, setHovered ] = useState({});
    const [ selected, setSelected ] = useState({});
    const [ showResults, setShowResults ] = useState(false);
    const [ authenticated, user, accessToken ] = useAuth(props.auth);
    let timer;
    const handleSearch = (e) => {
       setSearch(e.target.value.replace(/[^a-zA-Z0-9-_ /]/gi, ""));
    };
    const handleCancelSearch = () => {
        setSearchInput(false);
        setSearch("");
    };
    const handleKeyUp = (e) => {
        if (e.key!="ArrowUp"&&e.key!="ArrowDown") {
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {
            props.getSearchResults(search);
            }, 500);
        }
      };
    const handleKeyPress = () => {
        window.clearTimeout(timer);
      };
    const handleSelect = (item) => {
        removeMapPopup();
        handleCancelSearch;
        setSelected(item);
        map.flyTo({ center: [ item.longitude, item.latitude - LATITUDE_DIFF ], zoom: 16 });
        props.getPopup(item.propertyId, item.longitude, item.latitude);
        setShowResults(false);
        setSearchInput(false);
    };
    const handleHover = (item) => {
        setHovered(item);
    };
    const handleSearchArea = () => {
        props.applyFilter(authenticated, accessToken);
    };
    return (
        <div className='filterButtonGroup'>
            <div className='filterButtonGroup-left'>
            <ButtonSquare 
                icon={<LogoBlack color={"#000000"} size={windowSize.width<982 ? 2 : 1}/>} 
                onClick={props.onFilterClick}
                style={{ marginRight: 14 }}
                />   
            <ButtonSquare 
                icon={<IconLayers size={windowSize.width<982 ? 2 : 1}/>} 
                style={{ marginRight: 14 }}
                onClick={props.onLayersClick}
                />
            {!showSearchInput ? 
                <ButtonSquare 
                    icon={<IconSearch size={windowSize.width<982 ? 2 : 1}/>} 
                    style={{ marginRight: 14 }}
                    onClick={()=>setSearchInput(true)}
                    /> :
                <SearchInput
                    search={search}
                    placeholder={"320 Pitt St Sydney NSW 2000"}
                    onChange={(e)=>handleSearch(e)}
                    onCancel={handleCancelSearch}
                    onHover={handleHover}
                    onSelect={handleSelect}
                    onKeyPress={handleKeyPress}
                    onKeyUp={handleKeyUp}
                    showResults={showResults}
                    setShowResults={(state)=>setShowResults(state)}
                />
                }
                {props.searchAreaBtn&&!showSearchInput&&<ButtonSquare 
                  icon={<div className="searchBtn">Search this area</div>} 
                  style={{ width: 120, position: "absolute", marginLeft: "auto", marginRight: "auto", left: 0, right: 0 }}
                  onClick={handleSearchArea}
                  />}
            </div>

            {!propertyModal && <ToggleWidget
                leftValue={"List View"}
                rightValue={"Map View"}
                activeButton={!searchModal ? "Map View" : "List View"}
                onLeftClick={props.onListViewClick}
                onRightClick={props.onMapViewClick}
                />}
        </div>
    );
});


const mapStateToProps = (state) => {
    return {
        searchAreaBtn: state.searchAreaBtn,
        filter: state.filter
    };
};

const mapDispatchToProps = {
    getSearchResults,
    getPopup,
    applyFilter
};

FilterButtonGroup.propTypes = {
    onListViewClick: PropTypes.func,
    onMapViewClick: PropTypes.func,
    onFilterClick: PropTypes.func,
    onLayersClick: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterButtonGroup);
