import React, { useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PropListItem from '../../molecules/propListItem/PropListItem'
import PropListItem2 from '../../molecules/propListItem2/PropListItem2'
import { ADDRESS, AREA, ZONE, PRICE, PRICE_TO_LAND_VALUE, PRICE_PER_M2, LAND_VALUE, DESCRIPTION, BATHROOMS, BEDROOMS, CAR_SPACES, MINIMUM_LOT_SIZE, FLOOR_SPACE_RATIO, DEFAULT_HOUSE_IMAGE } from '../../../shared/constants';
import {IconAreaG, IconAddressG, IconZoneG, IconPriceG, IconPriceLandG, IconLandvalG, IconPriceMg, IconClose, IconBathG, IconBedG, IconCarG, IconLotG, IconFsrG} from '../../../assets/icons'
import variables from '../../../styles/_variables.scss';
import DeviderLine from '../../atoms/deviderLine/DeviderLine';
import ButtonProperty from '../../atoms/buttonProperty/ButtonProperty';
import './searchItem.scss'
import ImageLazy from '../../atoms/ImageLazy/ImageLazy';

const SearchItem = props => {
    const dispatch = useDispatch()
    const all = useSelector(state=>state)
    const {marker} = props
    const {id, area, zone, address, bathrooms, bedrooms, carspaces, price, land_value, price_psm, floor_space_ratio, price_to_land_value, minimum_lot_size, listing_url, summary_description, listing_photo, status} = props.marker
    const [shadow, setShadow] = useState(status==='marker-selected')
    const handleClick = () => {
        dispatch({type: 'CHANGE_ALL_MARKERS_STATUS', status: marker.status==='marker-selected' ? 'marker-visited' : 'marker-unvisited'})
        dispatch({type: 'CHANGE_MARKER_STATUS', payload: marker, status: 'marker-selected'})
        dispatch ({type: 'VIEWPORT_CHANGE', payload: {latitude: marker.latitude, longitude: marker.longitude}});
    }
    return (
        <div className='searchItem' onClick={handleClick}>
                <ImageLazy src={listing_photo || DEFAULT_HOUSE_IMAGE} shadow={status==='marker-selected'||shadow}/>
           <div className='searchItemInfo'>
                <PropListItem icon={address ? <IconAddressG/> : <IconAddressG color={variables.lightGrey}/>} title={ADDRESS} value11={`ID: ${id}`}/>
                <div className='searchItem-address'>{address}</div>
                <PropListItem2 
                    icon1={area ? <IconAreaG/> : <IconAreaG color={variables.lightGrey}/>} title1={AREA} value1={area}
                    icon2={zone ? <IconZoneG/> : <IconZoneG color={variables.lightGrey}/>} title2={ZONE} value2={zone}
                    />
                <PropListItem2 
                    icon1={bathrooms ? <IconBathG/> : <IconBathG color={variables.lightGrey}/>} 
                    title1={BATHROOMS} value1={bathrooms}
                    icon2={bedrooms ? <IconBedG/> : <IconBedG color={variables.lightGrey}/>} 
                    title2={BEDROOMS} value2={bedrooms}
                    />
                 <PropListItem2 
                    icon1={carspaces ? <IconCarG/> : <IconCarG color={variables.lightGrey}/>}
                    title1={CAR_SPACES} value1={carspaces}
                    icon2={floor_space_ratio || floor_space_ratio == 0 ? <IconFsrG/> : <IconFsrG color={variables.lightGrey}/>} 
                    title2={FLOOR_SPACE_RATIO} value2={floor_space_ratio}
                    />
                <DeviderLine/>
                <PropListItem icon={price ? <IconPriceG/> : <IconPriceG color={variables.lightGrey}/>} title={PRICE} value14={price}/>
                <PropListItem2 
                    icon1={price_to_land_value ? <IconPriceLandG/> : <IconPriceLandG color={variables.lightGrey}/>} 
                    title1={PRICE_TO_LAND_VALUE} value1={price_to_land_value&&`${price_to_land_value}%`}
                    icon2={minimum_lot_size ? <IconLotG/> : <IconLotG color={variables.lightGrey}/>} 
                    title2={MINIMUM_LOT_SIZE} value2={minimum_lot_size}
                    />
                <PropListItem2 
                    icon1={price_psm ? <IconPriceMg/> : <IconPriceMg color={variables.lightGrey}/>} 
                    title1={PRICE_PER_M2} value1={price_psm}
                    icon2={land_value ? <IconLandvalG/> : <IconLandvalG color={variables.lightGrey}/>} 
                    title2={LAND_VALUE} value2={land_value}
                    />
                <div className='propertyInformation-margin10'/>
                <PropListItem title={DESCRIPTION} value14={' '}/>
                <div className='searchItem-descr'>{summary_description}</div>
                <ButtonProperty title={'GO TO PROPERTY'} url={listing_url}/>
            </div>
        </div>
    )
}

SearchItem.propTypes = {

}

export default SearchItem
