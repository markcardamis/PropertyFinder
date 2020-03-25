import React from 'react';
import { connect } from 'react-redux';
import { FaBed, FaBath, FaCar, FaChartArea, FaBuilding, FaDoorOpen, FaLink, FaInfo, FaFileInvoiceDollar, FaBalanceScale } from 'react-icons/fa';
import { GiReceiveMoney, GiAustralia } from 'react-icons/gi';
import { IoMdPricetags, IoMdResize } from 'react-icons/io';
import Avatar from '@material-ui/core/Avatar';


import { DEFAULT_HOUSE_IMAGE } from '../../../shared/constants';
import CloseBtn from '../../buttons/closeBtn/CloseBtn';
import {style} from './style';

const PropertyInformation = (props) => {

        const { handleClosePropertyInfo } = props;
        const { id, address, area, floorSpaceRatio, minimumLotSize,
                price, listingURL, bathrooms, bedrooms, carspaces, zone, landValue, 
                pricePSM, priceToLandValue, summaryDescription, listingPhoto,
                } = props.property;
        const classes = style();

            return (
                    <div className={classes.propertyInformation}>
                        <CloseBtn onClick={handleClosePropertyInfo}/>
                        <h5>Property ID: {id}</h5>
                        <li><Avatar variant='rounded' src={listingPhoto || DEFAULT_HOUSE_IMAGE} className={classes.img}/></li>
                       
                        {/* {zoneCode && <li><GiAustralia size='1.5em'/><b> Zone Code: </b>{zoneCode}</li>}
                        {buildingHeight && <li><FaInfo size='1.5em'/><b> Building Height: </b>{buildingHeight}</li>} */}

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
                        {priceToLandValue && <li><FaBalanceScale size='1.5em'/><b> Price To Land Value: </b>{priceToLandValue}</li>}
                        {summaryDescription && <li><FaInfo size='1.5em'/><b> Description: </b>{summaryDescription}</li>}      
                    </div> 
            );
    };

const mapStateToProps = (state) => {
    return {
        property: state.showProperty
    };
};

export default connect(mapStateToProps)(PropertyInformation);

