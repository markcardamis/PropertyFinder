import React from 'react';
import { connect } from 'react-redux';

import { DEFAULT_HOUSE_IMAGE } from '../../../shared/constants';
import PropListItem from '../../molecules/propListItem/PropListItem';
import {IconAreaG, IconAddressG, IconZoneG, IconPriceG, IconPriceLandG, IconPriceM, IconLandvalG, IconPriceMg, IconClose} from '../../../assets/icons'
import './propertyInformation.scss'
import PropImg from '../../atoms/propImg/PropImg';
import ButtonProperty from '../../atoms/buttonProperty/ButtonProperty';
import PropListItem2 from '../../molecules/propListItem2/PropListItem2';
import ButtonSquare from '../../atoms/buttonSquare/ButtonSquare';

const PropertyInformation = (props) => {

        const { handleClosePropertyInfo } = props;
        // const { id, address, area, floorSpaceRatio, minimumLotSize,
        //         price, listingURL, bathrooms, bedrooms, carspaces, zone, landValue, 
        //         pricePSM, priceToLandValue, summaryDescription, listingPhoto,
        //         } = props.property;

        const id = 3408300;
        const price = 'Price guide $300,000';
        const listingURL = "https://www.domain.com.au/11a-john-street-granville-nsw-2142-2015880882";
        const listingPhoto="https://bucket-api.domain.com.au/v1/bucket/image/2015880882_1_1_191114_064017-w823-h538";
        const address="11a JOHN STREET GRANVILLE 2142";
        const unitNumber="hbhbhj";
        const houseNumber="11a";
        const streetName="John Street";
        const suburbName="GRANVILLE"
        const postCode="2142"
        const area=1025
        const bathrooms = "5.0"
        const bedrooms="5.0"
        const carspaces = 5
        const latitude = -33.8392677
        const longitude = 151.009811
        const summaryDescription = "it gives me great pleasure to introduce the most original and most unique parcel of land in sydney! rest assured, there is nothing quite like it! over 1000sqm of land in prime location - only 500m from granville train station and shops. ..."
        const zone="R2"
        const floorSpaceRatio = 0.50
        const minimumLotSize = null
        const landValue=279000
        const pricePSM=292
        const priceToLandValue = 1.08
        

            return (
                    <div className='propertyInformation'>
                        <div className='propertyInformation-close'>
                            <ButtonSquare icon={<IconClose/>} onClick={handleClosePropertyInfo}/>
                        </div>
                        <PropImg img={listingPhoto || DEFAULT_HOUSE_IMAGE}/>
                        <div className='propertyInformation-mainContainer'>
                            <PropListItem icon={<IconAddressG/>} title={'Address'} value11={`ID: ${id}`}/>
                            <div className='propertyInformation-address'>{address}</div>
                            <PropListItem2 
                                icon1={area&&<IconAreaG/>} title1={area&&'Area'} value1={area}
                                icon2={zone&&<IconZoneG/>} title2={zone&&'Zone'} value2={zone}
                                />
                            <div className='propertyInformation-devider'/>
                            {price&&<PropListItem icon={<IconPriceG/>} title={'Price'} value18={price}/>}
                            <div className='propertyInformation-margin2'/>
                            {priceToLandValue&&<PropListItem icon={<IconPriceLandG/>} title={'Price to Land Value'} value14={`${priceToLandValue}%`}/>}
                            <div className='propertyInformation-margin2'/>
                            <PropListItem2 
                                icon1={pricePSM&&<IconPriceMg/>} title1={pricePSM&&'Price per m2'} value1={pricePSM}
                                icon2={landValue&&<IconLandvalG/>} title2={landValue&&'Land Value'} value2={landValue}
                                />
                            <div className='propertyInformation-margin10'/>
                             {summaryDescription&&<PropListItem title={'Description'}/>}
                             <div className='propertyInformation-descr'>{summaryDescription}</div>
                        </div>
                        <ButtonProperty title={'GO TO PROPERTY'} url={listingURL}/>



                        {/* <CloseBtn onClick={handleClosePropertyInfo}/> */}
                         {/* <h5>Property ID: {id}</h5>
                         <li><Avatar variant='rounded' src={listingPhoto || DEFAULT_HOUSE_IMAGE} className={classes.img}/></li>
 
                        <PropListItem icon={<IconAreaG/>} title={'Area'} value={1025}/>
                        {price && <li><IoMdPricetags size='1.5em'/><b> Price: </b>{price}</li>}
                        {listingURL && <li><FaLink size='1.5em'/><b> URL: </b><a target='_blank' rel="noopener noreferrer" href={listingURL}>Link</a></li>}
                        {address && <li><FaDoorOpen size='1.5em'/><b> Address: </b>{address}</li>}
                        {area && <li><FaChartArea size='1.5em'/><b> Area: </b>{area}</li>}
                        {bathrooms && <li><FaBath size='1.5em'/><b> Bathrooms: </b>{bathrooms}</li>}
                        {bedrooms && <li><FaBed size='1.5em'/><b> Bedrooms: </b>{bedrooms}</li>}
                        {carspaces && <li><FaCar size='1.5em'/><b> Car spaces: </b>{carspaces}</li>}
                        {zone && <li><GiAustralia size='1.5em'/><b> Zone: </b>{zone}</li>}
                        {(floorSpaceRatio>0) && <li><FaBuilding size='1.5em'/><b> Floor Space Ratio: </b>{floorSpaceRatio}</li>}
                        {minimumLotSize && <li><IoMdResize size='1.5em'/><b> Minimum Lot Size: </b>{minimumLotSize}</li>}
                        {landValue && <li><GiReceiveMoney size='1.5em'/><b> Land Value: </b>{landValue}</li>}
                        {pricePSM && <li><FaFileInvoiceDollar size='1.5em'/><b> Price per m<sup>2</sup>: </b>{pricePSM}</li>}
                        {priceToLandValue && <li><FaBalanceScale size='1.5em'/><b> Price To Land Value: </b>{priceToLandValue}</li>} */}
                        {/* {summaryDescription && <li><FaInfo size='1.5em'/><b> Description: </b>{summaryDescription}</li>}       */}
                    </div> 
            );
    };

const mapStateToProps = (state) => {
    return {
        property: state.showProperty
    };
};

export default connect(mapStateToProps)(PropertyInformation);

