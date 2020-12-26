import React, {useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./popup.scss";
import Chart from "../../molecules/chart/Chart";
import { ADDRESS, AREA, ZONE, LAND_VALUE, FLOOR_SPACE_RATIO, MINIMUM_LOT_SIZE, BUILDING_HEIGHT, LAST_SOLD, INTERESTED_PEOPLE } from "../../../shared/constants/constants";
import PropListItem from "../../molecules/propListItem/PropListItem";
import PropListItem2 from "../../molecules/propListItem2/PropListItem2";
import { IconAddressG, IconAreaG, IconZoneG, IconLandvalG, IconFsrG, IconLotG, IconHeight, IconInterest, IconSold, IconStar, } from "../../../assets/icons";
import { useWindowSize } from "../../../modules/windowSize";
import { getUpperCase } from "../../../shared/utils/getUppercase";
import { saveWatchListItem } from '../../../store/actions/watchListAction/saveWatchListItemAction'
import { showSignIn } from "../../../store/actions/signInModalAction";

const Popup = props => {
    const { property_id, house_number, street_name, suburb_name, post_code, zone_code, area, area_type, floor_space_ratio, minimum_lot_size, building_height, land_value_1, last_sold, interested_people, interested_user } = props.propertyInfo;
    const {accessToken} = props.auth
    const address = `${house_number} ${getUpperCase(street_name)}, ${getUpperCase(suburb_name)}, ${post_code}`;
    const size = useWindowSize();
    const [interestedUser, setInterestedUser] = useState(interested_user)
    const addToWatchList = async () => {
        await props.saveWatchListItem();
        accessToken ? setInterestedUser(!interestedUser) : showSignIn()
    }
 
    return (
        <div style={{ width: size.width>982 ? 354 : 650 }}>
            <IconStar className="popup-favourite-icon" fill={interestedUser ? "#FFC107" : 'none'} onClick={addToWatchList}/>
            <Chart chartData={props.chartData} salesData={props.salesData}/>
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
                {floor_space_ratio!==null&&
                    <PropListItem 
                        icon={<IconFsrG size={size.width<982 ? 2:1}/>} 
                        title={FLOOR_SPACE_RATIO} 
                        value14={floor_space_ratio}
                        />
                    }
                <PropListItem2 
                    icon1={minimum_lot_size!==null&&<IconLotG size={size.width<982 ? 2:1}/>} 
                    title1={minimum_lot_size!==null&&MINIMUM_LOT_SIZE} 
                    value1={minimum_lot_size}
                    icon2={building_height!==null&&<IconHeight size={size.width<982 ? 2:1}/>} 
                    title2={building_height!==null&&BUILDING_HEIGHT} 
                    value2={`${building_height} M`}
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Popup)