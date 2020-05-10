import React from 'react';
import { connect } from 'react-redux';

import { DEFAULT_HOUSE_IMAGE, ADDRESS, AREA, ZONE, PRICE, PRICE_TO_LAND_VALUE, PRICE_PER_M2, LAND_VALUE, DESCRIPTION } from '../../../shared/constants';
import PropListItem from '../../molecules/propListItem/PropListItem';
import {IconAreaG, IconAddressG, IconZoneG, IconPriceG, IconPriceLandG, IconLandvalG, IconPriceMg, IconClose} from '../../../assets/icons'
import './propertyInformation.scss'
import PropImg from '../../atoms/propImg/PropImg';
import ButtonProperty from '../../atoms/buttonProperty/ButtonProperty';
import PropListItem2 from '../../molecules/propListItem2/PropListItem2';
import ButtonSquare from '../../atoms/buttonSquare/ButtonSquare';

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
        // const landValue=279000
        // const pricePSM=292
        // const priceToLandValue = 1.08
        

            return (
                    <div className='propertyInformation'>
                        <div className='propertyInformation-close'>
                            <ButtonSquare icon={<IconClose/>} onClick={handleClosePropertyInfo}/>
                        </div>
                        <PropImg img={listingPhoto || DEFAULT_HOUSE_IMAGE}/>
                        <div className='propertyInformation-mainContainer'>
                            <PropListItem icon={<IconAddressG/>} title={ADDRESS} value11={`ID: ${id}`}/>
                            <div className='propertyInformation-address'>{address}</div>
                            <PropListItem2 
                                icon1={area&&<IconAreaG/>} title1={area&&AREA} value1={area}
                                icon2={zone&&<IconZoneG/>} title2={zone&&ZONE} value2={zone}
                                />
                            <div className='propertyInformation-devider'/>
                            {price&&<PropListItem icon={<IconPriceG/>} title={PRICE} value18={price}/>}
                            {priceToLandValue&&<PropListItem icon={<IconPriceLandG/>} title={PRICE_TO_LAND_VALUE} value14={`${priceToLandValue}%`}/>}
                            <PropListItem2 
                                icon1={pricePSM&&<IconPriceMg/>} title1={pricePSM&&PRICE_PER_M2} value1={pricePSM}
                                icon2={landValue&&<IconLandvalG/>} title2={landValue&&LAND_VALUE} value2={landValue}
                                />
                            <div className='propertyInformation-margin10'/>
                             {summaryDescription&&<PropListItem title={DESCRIPTION}/>}
                             <div className='propertyInformation-descr'>{summaryDescription}</div>
                        </div>
                        <ButtonProperty title={'GO TO PROPERTY'} url={listingURL}/>
                        
                         {/* 
                        {bathrooms && <li><FaBath size='1.5em'/><b> Bathrooms: </b>{bathrooms}</li>}
                        {bedrooms && <li><FaBed size='1.5em'/><b> Bedrooms: </b>{bedrooms}</li>}
                        {carspaces && <li><FaCar size='1.5em'/><b> Car spaces: </b>{carspaces}</li>}
                        {(floorSpaceRatio>0) && <li><FaBuilding size='1.5em'/><b> Floor Space Ratio: </b>{floorSpaceRatio}</li>}
                        {minimumLotSize && <li><IoMdResize size='1.5em'/><b> Minimum Lot Size: </b>{minimumLotSize}</li>}
                         */}
                    </div> 
            );
    };

const mapStateToProps = (state) => {
    return {
        property: state.showProperty
    };
};

export default connect(mapStateToProps)(PropertyInformation);

