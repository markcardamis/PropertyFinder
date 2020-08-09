import React from 'react';
import PropTypes from 'prop-types';
import './popup.scss';
import Chart from '../../molecules/chart/Chart';
import {ADDRESS, AREA, ZONE, LAND_VALUE, FLOOR_SPACE_RATIO, MINIMUM_LOT_SIZE, BUILDING_HEIGHT} from '../../../shared/constants';
import PropListItem from '../../molecules/propListItem/PropListItem';
import PropListItem2 from '../../molecules/propListItem2/PropListItem2';
import {IconAddressG, IconAreaG, IconZoneG, IconLandvalG, IconFsrG, IconLotG, IconHeight} from '../../../assets/icons';
import { useWindowSize } from '../../../modules/windowSize';

const Popup = props => {
    const {propertyId, houseNumber, streetName, suburbName, postCode, zoneCode, area, floorSpaceRatio, minimumLotSize, buildingHeight, landValue1} = props.propertyInfo
    const upperCase = (str) => {
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }
    const address = `${houseNumber} ${upperCase(streetName)}, ${upperCase(suburbName)}, ${postCode}`
    const size = useWindowSize()
    return (
        <div style={{width: size.width>982 ? 354 : 650}}>
            <Chart chartData={props.chartData} salesData={props.salesData}/>
            <div className='popup-propertyInfo'>
                <PropListItem 
                    icon={<IconAddressG size={size.width<982 ? 2:1}/>} 
                    title={ADDRESS} 
                    value11={`ID: ${propertyId}`}
                    />
                <div className='popup-address'>{address}</div>
                <PropListItem2 
                    icon1={area&&<IconAreaG size={size.width<982 ? 2:1}/>} 
                    title1={area&&AREA} 
                    value1={area}
                    icon2={zoneCode&&<IconZoneG size={size.width<982 ? 2:1}/>} 
                    title2={zoneCode&&ZONE} 
                    value2={zoneCode}
                    />
                <div className='popup-devider'/>
                <PropListItem 
                    icon={<IconLandvalG size={size.width<982 ? 2:1}/>} 
                    title={LAND_VALUE} 
                    value11={landValue1}
                    />
                {floorSpaceRatio!==null&&
                    <PropListItem 
                        icon={<IconFsrG size={size.width<982 ? 2:1}/>} 
                        title={FLOOR_SPACE_RATIO} 
                        value14={floorSpaceRatio}
                        />
                    }
                {minimumLotSize!==null&&
                    <PropListItem 
                        icon={<IconLotG size={size.width<982 ? 2:1}/>} 
                        title={MINIMUM_LOT_SIZE} 
                        value14={minimumLotSize}
                        />
                    }
                {buildingHeight!==null&&
                    <PropListItem 
                        icon={<IconHeight size={size.width<982 ? 2:1}/>} 
                        title={BUILDING_HEIGHT} 
                        value14={buildingHeight}
                        />
                    }
            </div>
        </div>
    )
}

Popup.propTypes = {
    chartData: PropTypes.object,
    propertyInfo: PropTypes.object
}

export default Popup;
