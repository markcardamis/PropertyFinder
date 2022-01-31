import React from "react";
import { useDispatch } from "react-redux";

import PropListItem2 from "../../molecules/propListItem2/PropListItem2";
import PropListItem from "../../molecules/propListItem/PropListItem";
import { ADDRESS, AREA, ZONE, PRICE, PRICE_TO_LAND_VALUE, PRICE_PER_M2, LAND_VALUE, DESCRIPTION, BATHROOMS, BEDROOMS, CAR_SPACES, MINIMUM_LOT_SIZE, FLOOR_SPACE_RATIO, DEFAULT_HOUSE_IMAGE } from "../../../shared/constants/constants";
import { IconAreaG, IconAddressG, IconZoneG, IconPriceG, IconPriceLandG, IconLandvalG, IconPriceMg, IconClose, IconBathG, IconBedG, IconCarG, IconLotG, IconFsrG } from "../../../assets/icons";
import variables from "../../../styles/_variables.module.scss";
import DeviderLine from "../../atoms/deviderLine/DeviderLine";
import ButtonProperty from "../../atoms/buttonProperty/ButtonProperty";
import "./searchItem.scss";
import ImageLazy from "../../atoms/ImageLazy/ImageLazy";
import { map } from "../../organisms/map/MapGL";
import { changeAllMarkers, changeMarker } from "../../../store/actions/mapMarkerAction";
import { viewportChange } from "../../../store/actions/viewportAction";

export interface Marker {
    id: string;
    area: string;
    zone: string;
    address: string;
    bathrooms: string; 
    bedrooms: string;
    carspaces: string;
    price: string;
    land_value: string;
    price_psm: string;
    floor_space_ratio: string;
    price_to_land_value: string;
    minimum_lot_size: string;
    listing_url: string;
    summary_description: string;
    listing_photo: string;
    status: string;
    latitude: string;
    longitude: string;
}

export interface SearchItemProps {
    marker: Marker;
}

const SearchItem = ({ marker }: SearchItemProps) => {
    const dispatch = useDispatch();
    const { id, area, zone, address, bathrooms, bedrooms, carspaces, price, land_value, price_psm, floor_space_ratio, price_to_land_value, minimum_lot_size, listing_url, summary_description, listing_photo, status, longitude, latitude } = marker;
    const handleClick = () => {
        dispatch(changeAllMarkers(marker, "marker-unvisited"));
        dispatch(changeMarker(marker, "marker-selected"));
        dispatch(viewportChange({ latitude, longitude }));
        map.flyTo({ center: [ longitude, latitude ], zoom: 10 });
    };
    return (
        <div className='searchItem' onClick={handleClick}>
                <ImageLazy src={listing_photo || DEFAULT_HOUSE_IMAGE} shadow={status==="marker-selected"}/>
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
                    title1={PRICE_TO_LAND_VALUE} value1={price_to_land_value}
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
                <PropListItem title={DESCRIPTION} value14={" "}/>
                <div className='searchItem-descr'>{summary_description}</div>
                <ButtonProperty title={"GO TO PROPERTY"} url={listing_url}/>
            </div>
        </div>
    );
};

export default SearchItem;
