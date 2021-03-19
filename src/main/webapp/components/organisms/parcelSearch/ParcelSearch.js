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
import { IconArea, IconFsr, IconPrice, IconZone, IconPost, IconBuildingHeight, IconLandOnly, IconNearBy, IconFence } from "../../../assets/icons";
import { setParcelFilter, resetParcelFilter } from "../../../store/actions/parcelSearchAction/setParcelFilter";
import { applyParcelSearch } from "../../../store/actions/parcelSearchAction/parcelSearchAction";
import { closeFilter } from "../../../store/actions/filterModalAction";
import { CheckboxFilterLine } from "../../molecules/checkboxFilterLine/CheckboxFilterLine";
import variables from "../../../styles/_variables.scss";
import ButtonOutlined from "../../atoms/buttonOutlined/ButtonOutlined";
import { map } from "../../organisms/map/MapGL";

const ParcelSearch = (props) => {
    const { latitude, longitude } = props.viewport;
    const { parcelSearch } = props;
    const { zone, area, postCode, buildingHeight, floorspaceRatio, landValue, landOnly, nearbyDA, streetFrontage } = props.parcelSearch;

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
      map.flyTo({ center: [ longitude, latitude ], zoom: 16 });
      props.closeFilter();
    };

    const handleResetFilter = () => {
        props.resetParcelFilter();
        // remove parcels
        map.setFilter("nsw-property-highlighted", [ "in", "propid", "" ]);
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
                  icon={<IconBuildingHeight/>} 
                  value={buildingHeight}
                  step={1} 
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

                <FilterLine 
                  title22={"Street Frontage"} 
                  icon={<IconFence/>} 
                  value={streetFrontage}
                  step={0.1} 
                  showCurrency={false}
                  onChange={(val)=>props.setParcelFilter({ ...parcelSearch, streetFrontage: val })} 
                  min={0} 
                  max={50} 
                  labelMin={"0.0"} 
                  labelMax={"50.0+"}
                />
                <div className="checkboxLine"> 
                    <CheckboxFilterLine 
                      title='Land Only' 
                      icon={<IconLandOnly/>}
                      value={landOnly} 
                      onClick={()=>props.setParcelFilter({ ...parcelSearch, landOnly: !landOnly })}
                      style={{ paddingRight: "5px" }}
                      />
                    <CheckboxFilterLine 
                      title='Include nearby DA' 
                      icon={<IconNearBy color={variables.darkGrey} />}
                      value={nearbyDA} 
                      onClick={()=>props.setParcelFilter({ ...parcelSearch, nearbyDA: !nearbyDA })}
                      style={{ paddingLeft: "5px" }}
                      />
                </div>
                </div> 

                <div className='filterBtnContainer'>
                  <ButtonOutlined title={"Reset filter"} onClick={handleResetFilter} style={{ width: "22%" }} titleStyle={{ color: variables.green }} />
                  <ButtonFilled title={"Search"} onClick={handleSubmit} style={{ width: "53%" }} />
                </div>
              </div>
        );
    };

const mapStateToProps = (state) => {
  return {
    parcelSearch: state.parcelSearch,
    viewport: state.viewport,
  };
};
const mapDispatchToProps = {
    setParcelFilter,
    resetParcelFilter,
    applyParcelSearch,
    closeFilter
  };

ParcelSearch.propTypes = {
  resetParcelFilter: PropTypes.func,
  setParcelFilter: PropTypes.func,
  applyParcelSearch: PropTypes.func,
  closeFilter: PropTypes.func,
  parcelSearch: PropTypes.object,
  viewport: PropTypes.object,
};

  export default connect(mapStateToProps, mapDispatchToProps)(ParcelSearch);