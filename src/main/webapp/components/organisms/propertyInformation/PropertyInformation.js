import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

import { DEFAULT_HOUSE_IMAGE, ADDRESS, AREA, ZONE, PRICE, PRICE_TO_LAND_VALUE, PRICE_PER_M2, LAND_VALUE, DESCRIPTION, BATHROOMS, BEDROOMS, CAR_SPACES, MINIMUM_LOT_SIZE, FLOOR_SPACE_RATIO } from "../../../shared/constants";
import PropListItem from "../../molecules/propListItem/PropListItem";
import { IconAreaG, IconAddressG, IconZoneG, IconPriceG, IconPriceLandG, IconLandvalG, IconPriceMg, IconClose, IconBathG, IconBedG, IconCarG, IconLotG, IconFsrG, IconCloseMobile } from "../../../assets/icons";
import "./propertyInformation.scss";
import PropImg from "../../atoms/propImg/PropImg";
import ButtonProperty from "../../atoms/buttonProperty/ButtonProperty";
import PropListItem2 from "../../molecules/propListItem2/PropListItem2";
import ButtonSquare from "../../atoms/buttonSquare/ButtonSquare";
import DeviderLine from "../../atoms/deviderLine/DeviderLine";
import variables from "../../../styles/_variables.scss";
import Fade from "react-reveal/Fade";


const PropertyInformation = (props) => {

        const { handleClosePropertyInfo } = props;
        // const { id, address, area, floorSpaceRatio, minimumLotSize,
        //     price, listingURL, bathrooms, bedrooms, carspaces, zone, landValue, 
        //     pricePSM, priceToLandValue, summaryDescription, listingPhoto,
        //     } = props.property;   
        const propertyInfo = useSelector(state=>state.propertyModal);
        const { id, address, area, floorSpaceRatio, minimumLotSize,
            price, listingURL, bathrooms, bedrooms, carspaces, zone, landValue, 
            pricePSM, priceToLandValue, summaryDescription, listingPhoto,
            } = propertyInfo;  

            return (
                <Fade>
                    <div className='propertyInformation'>
                        <div className='propertyInformation-close'>
                            <div className='buttonClose'><ButtonSquare icon={<IconClose/>} onClick={handleClosePropertyInfo}/></div>
                            <div className='buttonCloseMobile'><ButtonSquare icon={<IconCloseMobile/>} onClick={handleClosePropertyInfo}/></div>
                        </div>
                        <div>
                            <PropImg img={listingPhoto || DEFAULT_HOUSE_IMAGE}/>
                            {/* <PropImg img={props.property.listing_photo || DEFAULT_HOUSE_IMAGE}/> */}
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
                                <PropListItem icon={priceToLandValue ? <IconPriceLandG/> : <IconPriceLandG color={variables.lightGrey}/>} title={PRICE_TO_LAND_VALUE} value14={priceToLandValue&&priceToLandValue}/>
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
                                <PropListItem title={DESCRIPTION} value14={" "}/>
                                <div className='propertyInformation-descr'>{summaryDescription}</div>
                            </div>
                            <ButtonProperty title={"GO TO PROPERTY"} url={listingURL}/>
                        </div>
                    </div>
                </Fade> 
            );
    };


const mapStateToProps = (state) => {
    return {
        property: state.showProperty
    };
};

export default connect(mapStateToProps)(PropertyInformation);

