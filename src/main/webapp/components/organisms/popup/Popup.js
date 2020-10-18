import React from "react";
import PropTypes from "prop-types";
import "./popup.scss";
import Chart from "../../molecules/chart/Chart";
import { ADDRESS, AREA, ZONE, LAND_VALUE, FLOOR_SPACE_RATIO, MINIMUM_LOT_SIZE, BUILDING_HEIGHT, LAST_SOLD, INTERESTED_PEOPLE } from "../../../shared/constants";
import PropListItem from "../../molecules/propListItem/PropListItem";
import PropListItem2 from "../../molecules/propListItem2/PropListItem2";
import { IconAddressG, IconAreaG, IconZoneG, IconLandvalG, IconFsrG, IconLotG, IconHeight, IconClock, IconInterest, } from "../../../assets/icons";
import { useWindowSize } from "../../../modules/windowSize";

const Popup = props => {
    const { property_id, house_number, street_name, suburb_name, post_code, zone_code, area, area_type, floor_space_ratio, minimum_lot_size, building_height, land_value_0, last_sold, interested_people } = props.propertyInfo;
    const upperCase = (str) => {
        let splitStr = str.toLowerCase().split(" ");
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(" "); 
    };
    const address = `${house_number} ${upperCase(street_name)}, ${upperCase(suburb_name)}, ${post_code}`;
    const size = useWindowSize();
 
    return (
        <div style={{ width: size.width>982 ? 354 : 650 }}>
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
                    icon={<IconClock size={size.width<982 ? 2:1}/>} 
                    title={LAST_SOLD} 
                    value11={last_sold}
                    />
                <PropListItem 
                    icon={<IconLandvalG size={size.width<982 ? 2:1}/>} 
                    title={LAND_VALUE} 
                    value11={land_value_0}
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
                    value2={building_height}
                    />
                <PropListItem 
                    icon={<IconInterest size={size.width<982 ? 2:1}/>} 
                    title={INTERESTED_PEOPLE} 
                    value11={interested_people}
                    />
            </div>
        </div>
    );
};

Popup.propTypes = {
    chartData: PropTypes.object,
    salesData: PropTypes.object,
    propertyInfo: PropTypes.object,
    closePopup: PropTypes.func
};

export default Popup;
