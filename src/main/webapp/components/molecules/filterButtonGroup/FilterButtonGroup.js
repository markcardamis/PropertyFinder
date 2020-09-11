import React, {useState} from "react";
import PropTypes from "prop-types";
import {useSelector, connect} from "react-redux";
import ButtonSquare from "../../atoms/buttonSquare/ButtonSquare";
import {LogoBlack, IconLayers, IconSearch} from "../../../assets/icons";
import "./filterButtonGroup.scss";
import { useWindowSize } from "../../../modules/windowSize";
import { getSearchResults } from "../../../store/actions/searchAction";
import { getPopup } from "../../../store/actions/popupAction";
import SearchInput from "../searchInput/SearchInput";
import {map} from "../../organisms/map/MapGL";
import ToggleWidget from "../toggleWidget/ToggleWidget";

const FilterButtonGroup = props => {
    const searchModal = useSelector(state=>state.searchModal);
    const propertyModal = useSelector(state=>state.propertyModal.isHidden);
    const windowSize = useWindowSize();
    const [showSearchInput, setSearchInput] = useState(false);
    const [search, setSearch] = useState("");
    const [hovered, setHovered] = useState({});
    const [selected, setSelected] = useState({});
    const [showResults, setShowResults] = useState(false);
    let timer;
    const handleSearch = (e) => {
       setSearch(e.target.value.replace(/[^a-zA-Z0-9_ /]/gi, ""));
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
    const handleKeyPress = (e) => {
        window.clearTimeout(timer);
      };
    const handleSelect = (item) => {
        handleCancelSearch;
        setSelected(item);
        map.flyTo({center: [item.longitude, item.latitude], zoom: 16});
        props.getPopup(item.propertyId, item.longitude, item.latitude);
        setShowResults(false);
        setSearchInput(false);
    };
    const handleHover = (item) => {
        setHovered(item);
    };
    return (
        <div className='filterButtonGroup'>

            <div className='filterButtonGroup-left'>
            <ButtonSquare 
                icon={<LogoBlack color={"#000000"} size={windowSize.width<982 ? 2 : 1}/>} 
                onClick={props.onFilterClick}
                style={{marginRight: 14}}
                />   
            <ButtonSquare 
                icon={<IconLayers size={windowSize.width<982 ? 2 : 1}/>} 
                color={"#000000"} 
                style={{marginRight: 14}}
                onClick={props.onLayersClick}
                />
            {!showSearchInput&&!propertyModal ? 
                <ButtonSquare 
                    icon={<IconSearch size={windowSize.width<982 ? 2 : 1}/>} 
                    color={"#000000"} 
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
            </div>
            <ToggleWidget
                leftValue={"List View"}
                rightValue={"Map View"}
                activeButton={!searchModal ? "Map View" : "List View"}
                onLeftClick={props.onListViewClick}
                onRightClick={props.onMapViewClick}
                />
        </div>
    );
};

FilterButtonGroup.propTypes = {
    onMenuClick: PropTypes.func,
    onFilterClick: PropTypes.func
};

const mapStateToProps = () => {
    return {
    
    };
};

const mapDispatchToProps = {
    getSearchResults,
    getPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterButtonGroup);
