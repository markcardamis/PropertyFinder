import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./popup.scss";
import Chart from "../../molecules/chart/Chart";
import { ADDRESS, AREA, ZONE, LAND_VALUE, FLOOR_SPACE_RATIO, MINIMUM_LOT_SIZE, BUILDING_HEIGHT, LAST_SOLD, INTERESTED_PEOPLE, LEP_LINK, STREET_FRONTAGE } from "../../../shared/constants/constants";
import PropListItem from "../../molecules/propListItem/PropListItem";
import PropListItem2 from "../../molecules/propListItem2/PropListItem2";
import { IconAddressG, IconAreaG, IconZoneG, IconLandvalG, IconFsrG, IconLotG, IconHeight, IconInterest, IconSold, IconStar, IconLink, IconFence, } from "../../../assets/icons";
import { useWindowSize } from "../../../modules/windowSize";
import { getUpperCase } from "../../../shared/utils/getUppercase";
import { saveWatchListItem } from "../../../store/actions/watchListAction/saveWatchListItemAction";
import { showSignIn } from "../../../store/actions/signInModalAction";
import variables from "../../../styles/_variables.module.scss";

const Popup = props => {
    const { property_id, house_number, street_name, suburb_name, post_code, zone_code, area, area_type, floor_space_ratio, minimum_lot_size, building_height, land_value_1, last_sold, interested_people, legislation_url, interested_user, street_frontage } = props.propertyInfo;
    const { land_values, property_sales } = props.propertyInfo.chart_data;
    const { accessToken } = props.auth;
    const address = `${house_number} ${getUpperCase(street_name)}, ${getUpperCase(suburb_name)}, ${post_code}`;
    const size = useWindowSize();
    const [ interestedUser, setInterestedUser ] = useState(interested_user);
    const addToWatchList = async () => {
        await props.saveWatchListItem();
        accessToken ? setInterestedUser(!interestedUser) : showSignIn();
    };
 
    return (
        <div style={{ width: size.width>982 ? 354 : 650 }}>
            <IconStar className="popup-favourite-icon" fill={interestedUser ? "#FFC107" : "none"} onClick={addToWatchList}/>
            <Chart landvalueData={land_values} salesData={property_sales}/>
            <div className='popup-propertyInfo'>
                <PropListItem 
                    icon={<IconAddressG size={size.width<982 ? 2:1}/>} 
                    title={ADDRESS} 
                    value11={`ID: ${property_id}`}
                    />
                <div className='popup-address'>{address}</div>
                <PropListItem2 
                    icon1={area&&<IconAreaG size={size.width<982 ? 2:1}/>} 
                    title1={area&&AREA} 
                    value1={`${area} ${area_type}`}
                    icon2={zone_code&&<IconZoneG size={size.width<982 ? 2:1}/>} 
                    title2={zone_code&&ZONE} 
                    value2={zone_code}
                    />
                <div className='popup-devider'/>
                <PropListItem 
                    icon={<IconSold size={size.width<982 ? 2:1}/>} 
                    title={LAST_SOLD} 
                    value11={last_sold}
                    />
                <PropListItem 
                    icon={<IconLandvalG size={size.width<982 ? 2:1}/>} 
                    title={LAND_VALUE} 
                    value11={`$${land_value_1}`}
                    />
                 <PropListItem2 
                    icon1={floor_space_ratio!==null&&<IconFsrG size={size.width<982 ? 2:1}/>} 
                    title1={floor_space_ratio!==null&&FLOOR_SPACE_RATIO} 
                    value1={floor_space_ratio}
                    icon2={street_frontage!==null&&<IconFence color={variables.green} />} 
                    title2={street_frontage!==null&&STREET_FRONTAGE} 
                    value2={street_frontage}
                    />
                <PropListItem2 
                    icon1={minimum_lot_size!==null&&<IconLotG size={size.width<982 ? 2:1}/>} 
                    title1={minimum_lot_size!==null&&MINIMUM_LOT_SIZE} 
                    value1={minimum_lot_size}
                    icon2={building_height!==null&&<IconHeight size={size.width<982 ? 2:1}/>} 
                    title2={building_height!==null&&BUILDING_HEIGHT} 
                    value2={`${building_height} M`}
                    />
                <PropListItem 
                    icon={<IconLink size={size.width<982 ? 1.7:0.7} color={variables.green}/>} 
                    title={LEP_LINK} 
                    value11={<a href={legislation_url} target="_blank" rel="noopener noreferrer" >{legislation_url.slice(0, 35)}...</a>}
                    />
                <PropListItem 
                    icon={<IconInterest size={size.width<982 ? 2:1}/>} 
                    title={INTERESTED_PEOPLE} 
                    value11={interested_people}
                    />
            </div>
            <div className="popup-watchList" onClick={addToWatchList}>
                <span className="popup-watchList-plus-icon">+</span> Add to Watch List
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      watchList: state.watchList
    };
  };
  const mapDispatchToProps = {
    saveWatchListItem,
    showSignIn
  };

  Popup.propTypes = {
    propertyInfo: PropTypes.object,
    auth: PropTypes.object,
    saveWatchListItem: PropTypes.func
};
  
  export default connect(mapStateToProps, mapDispatchToProps)(Popup);