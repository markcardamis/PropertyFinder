import React from 'react';
import { connect } from 'react-redux';

import { DEFAULT_HOUSE_IMAGE, ADDRESS, AREA, ZONE, PRICE, PRICE_TO_LAND_VALUE, PRICE_PER_M2, LAND_VALUE, DESCRIPTION, BATHROOMS, BEDROOMS, CAR_SPACES, MINIMUM_LOT_SIZE, FLOOR_SPACE_RATIO } from '../../../shared/constants';
import PropListItem from '../../molecules/propListItem/PropListItem';
import {IconAreaG, IconAddressG, IconZoneG, IconPriceG, IconPriceLandG, IconLandvalG, IconPriceMg, IconClose, IconBathG, IconBedG, IconCarG, IconLotG, IconFsrG} from '../../../assets/icons'
import './propertyInformation.scss'
import PropImg from '../../atoms/propImg/PropImg';
import ButtonProperty from '../../atoms/buttonProperty/ButtonProperty';
import PropListItem2 from '../../molecules/propListItem2/PropListItem2';
import ButtonSquare from '../../atoms/buttonSquare/ButtonSquare';
import DeviderLine from '../../atoms/deviderLine/DeviderLine';
import variables from '../../../styles/_variables.scss';

const PropertyInformation = (props) => {

        const { handleClosePropertyInfo } = props;
        const { id, address, area, floorSpaceRatio, minimumLotSize,
                price, listingURL, bathrooms, bedrooms, carspaces, zone, landValue, 
                pricePSM, priceToLandValue, summaryDescription, listingPhoto,
                } = props.property;

        // const id = 3408300;
        // const price = 'Price guide $300,000';
        // const listingURL = "https://www.domain.com.au/11a-john-street-granville-nsw-2142-2015880882";
        // const listingPhoto="https://bucket-api.domain.com.au/v1/bucket/image/2015880882_1_1_191114_064017-w823-h538";
        // const address="11a JOHN STREET GRANVILLE 2142";
        // const unitNumber="hbhbhj";
        // const houseNumber="11a";
        // const streetName="John Street";
        // const suburbName="GRANVILLE"
        // const postCode="2142"
        // const area=1025
        // const bathrooms = "5.0"
        // const bedrooms="5.0"
        // const carspaces = 5
        // const latitude = -33.8392677
        // const longitude = 151.009811
        // const summaryDescription = "it gives me great pleasure to introduce the most original and most unique parcel of land in sydney! rest assured, there is nothing quite like it! over 1000sqm of land in prime location - only 500m from granville train station and shops. ..."
        // const zone="R2"
        // const floorSpaceRatio = 0.50
        // const minimumLotSize = null
        // const landValue=null
        // const pricePSM=292
        // const priceToLandValue = null
        

            return (
                    <div className='propertyInformation'>
                        <div className='propertyInformation-close'>
                            <ButtonSquare icon={<IconClose/>} onClick={handleClosePropertyInfo}/>
                        </div>
                        <PropImg img={listingPhoto || DEFAULT_HOUSE_IMAGE}/>
                        <div className='propertyInformation-mainContainer'>
                            <PropListItem icon={address ? <IconAddressG/> : <IconAddressG color={variables.lightGrey}/>} title={ADDRESS} value11={`ID: ${id}`}/>
                            <div className='propertyInformation-address'>{address}</div>
                            <PropListItem2 
                                icon1={area ? <IconAreaG/> : <IconAreaG color={variables.lightGrey}/>} title1={AREA} value1={area}
                                icon2={zone ? <IconZoneG/> : <IconZoneG color={variables.lightGrey}/>} title2={ZONE} value2={zone}
                                />
                            <DeviderLine/>
                            <PropListItem2 
                                icon1={bathrooms ? <IconBathG/> : <IconBathG color={variables.lightGrey}/>} 
                                title1={BATHROOMS} value1={bathrooms}
                                icon2={bedrooms ? <IconBedG/> : <IconBedG color={variables.lightGrey}/>} 
                                title2={BEDROOMS} value2={bedrooms}
                                />
                            <PropListItem icon={carspaces ? <IconCarG/> : <IconCarG color={variables.lightGrey}/>} title={CAR_SPACES} value14={carspaces}/>
                            <DeviderLine/>
                            <PropListItem icon={price ? <IconPriceG/> : <IconPriceG color={variables.lightGrey}/>} title={PRICE} value18={price}/>
                            <PropListItem icon={priceToLandValue ? <IconPriceLandG/> : <IconPriceLandG color={variables.lightGrey}/>} title={PRICE_TO_LAND_VALUE} value14={priceToLandValue&&`${priceToLandValue}%`}/>
                            <PropListItem2 
                                icon1={pricePSM ? <IconPriceMg/> : <IconPriceMg color={variables.lightGrey}/>} 
                                title1={PRICE_PER_M2} value1={pricePSM}
                                icon2={landValue ? <IconLandvalG/> : <IconLandvalG color={variables.lightGrey}/>} 
                                title2={LAND_VALUE} value2={landValue}
                                />
                             <PropListItem2 
                                icon1={floorSpaceRatio ? <IconFsrG/> : <IconFsrG color={variables.lightGrey}/>} 
                                title1={FLOOR_SPACE_RATIO} value1={floorSpaceRatio}
                                icon2={minimumLotSize ? <IconLotG/> : <IconLotG color={variables.lightGrey}/>} 
                                title2={MINIMUM_LOT_SIZE} value2={minimumLotSize}
                                />
                            <div className='propertyInformation-margin10'/>
                             <PropListItem title={DESCRIPTION}/>
                             <div className='propertyInformation-descr'>{summaryDescription}</div>
                        </div>
                        <ButtonProperty title={'GO TO PROPERTY'} url={listingURL}/>
                    </div> 
            );
    };

const mapStateToProps = (state) => {
    return {
        property: state.showProperty
    };
};

export default connect(mapStateToProps)(PropertyInformation);

