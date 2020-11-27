import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "rc-slider/assets/index.css";
import "rc-dropdown/assets/index.css";

import { ZONES } from "../../../shared/constants/zones";
import "./parcelSearch.scss";
import { FilterLine, ZoneSelect, PostCode } from "./components";
import DeviderLine from "../../atoms/deviderLine/DeviderLine";
import ButtonFilled from "../../atoms/buttonFilled/ButtonFilled";
import { IconArea, IconFsr, IconPrice, IconZone, IconPost } from "../../../assets/icons";
import { setParcelFilter, resetParcelFilter } from "../../../store/actions/parcelSearchAction/setParcelFilter";
import { applyParcelSearch } from "../../../store/actions/parcelSearchAction/parcelSearchAction";
import { closeFilter } from "../../../store/actions/filterModalAction";

const ParcelSearch = (props) => {
    const { parcelSearch } = props;
    const { zone, area, postCode, buildingHeight, floorspaceRatio, landValue } = props.parcelSearch;

    const onSelect = ({ key }) => {
      props.setParcelFilter({ ...parcelSearch, zone: key });
      let zoneColor = ZONES.filter(item=>{
        return item.name===key;
      });
      setZoneColor(zoneColor[0].color);
    };
    const [ zoneColor, setZoneColor ] = useState(null);

    const handleSubmit = async () => {
        await props.applyParcelSearch();
        props.closeFilter();
    };

        return (
            <div className='filterTab'> 
              <div className='filterInputContainer'>
              <ZoneSelect 
                zone={zone} 
                zoneColor={zoneColor} 
                title22={"Zone"} 
                icon={<IconZone/>} 
                onSelect={onSelect}
                />
               <PostCode 
                title22={"Post Code"} 
                icon={<IconPost/>} 
                value={postCode} 
                showValidation={false}
                onChange={(event)=>props.setParcelFilter({ ...parcelSearch, postCode: event.target.value })}
                />
                <DeviderLine/>

              <FilterLine 
                  title22={"Area"} 
                  icon={<IconArea/>} 
                  value={area}
                  step={100} 
                  showCurrency={false}
                  onChange={(val)=>props.setParcelFilter({ ...parcelSearch, area: val })} 
                  min={0} 
                  max={20000} 
                  labelMin={"0"} 
                  labelMax={"20 000+"}
                />

                <FilterLine 
                  title22={"Building Height"} 
                  icon={<IconFsr/>} 
                  value={buildingHeight}
                  step={10} 
                  showCurrency={false}
                  onChange={(val)=>props.setParcelFilter({ ...parcelSearch, buildingHeight: val })} 
                  min={0} 
                  max={100} 
                  labelMin={"0"} 
                  labelMax={"100+"}
                  />
          
                <FilterLine 
                  title22={"Floor Space Ratio"} 
                  icon={<IconFsr/>}
                  value={floorspaceRatio}
                  step={0.1} 
                  showCurrency={false}
                  onChange={(val)=>props.setParcelFilter({ ...parcelSearch, floorspaceRatio: val })} 
                  min={0} 
                  max={2} 
                  labelMin={"0.0"} 
                  labelMax={"2.0+"}
                  />
                <DeviderLine/>

                <FilterLine 
                  title22={"Land Value"} 
                  icon={<IconPrice/>}
                  value={landValue}
                  step={10000} 
                  showCurrency={true}
                  onChange={(val)=>props.setParcelFilter({ ...parcelSearch, landValue: val })}
                  min={100000} 
                  max={5000000} 
                  labelMin={"$100k"} 
                  labelMax={"$5M"}
                  />
                {/* <FilterLine 
                  title22={"Street Frontage"} 
                  icon={<IconPriceM/>} 
                  value={filter.priceM2} 
                  step={10} 
                  showCurrency={true}
                  onChange={(val)=>this.props.getFilter({ ...filter, priceM2: val })} 
                  min={0} 
                  max={10000} 
                  labelMin={"$1"} 
                  labelMax={"$10 000+"}
                  /> */}
                {/* <div>Sold in last 6 years</div> */}
                 <div className="resetFilterBtn" onClick={props.resetParcelFilter}>Reset filter</div>
                </div> 
                  <div className='filterBtnContainer'>
                  <div className='btnSavePref'/>
                  <div className='btnSearch'><ButtonFilled title={"Search"} onClick={handleSubmit}/></div>
                </div>
              </div>
        );
    }

const mapStateToProps = (state) => {
  return {
    parcelSearch: state.parcelSearch,
  };
};
const mapDispatchToProps = {
    setParcelFilter,
    resetParcelFilter,
    applyParcelSearch,
    closeFilter
  };

ParcelSearch.propTypes = {
    
};

  export default connect(mapStateToProps, mapDispatchToProps)(ParcelSearch);