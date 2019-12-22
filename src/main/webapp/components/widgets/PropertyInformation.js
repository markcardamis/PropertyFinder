import React from 'react';
import { connect } from 'react-redux';
import { FaBed, FaBath, FaCar, FaChartArea, FaBuilding, FaDoorOpen, FaLink, FaInfo, FaFileInvoiceDollar, FaBalanceScale } from 'react-icons/fa';
import { GiReceiveMoney, GiAustralia } from 'react-icons/gi';
import { IoMdPricetags, IoMdClose, IoMdResize } from 'react-icons/io';

import { DEFAULT_HOUSE_IMAGE } from '../../shared/constants';


class PropertyInformation extends React.Component {

    render () {
        const { handleClosePropertyInfo, property } = this.props;
            return (
                <div>
                    <ul className='propertyInformation'>
                        <li><h4>Property ID: {property.id}</h4>
                            <IoMdClose size='2em' onClick={handleClosePropertyInfo}/>
                        </li>
                        <li><img src={property.listingPhoto || DEFAULT_HOUSE_IMAGE} style={{width: '150px', height: '150px'}}/></li>
                        {property.price && <li><IoMdPricetags size='1.5em'/><b> Price: </b>{property.price}</li>}
                        {property.listingURL && <li><FaLink size='1.5em'/><b> URL: </b><a target='_blank' href={property.listingURL}>{property.listingURL}</a></li>}
                        {property.address && <li><FaDoorOpen size='1.5em'/><b> Address: </b>{property.address}</li>}
                        {property.area && <li><FaChartArea size='1.5em'/><b> Area: </b>{property.area}</li>}
                        {property.bathrooms && <li><FaBath size='1.5em'/><b> Bathrooms: </b>{property.bathrooms}</li>}
                        {property.bedrooms && <li><FaBed size='1.5em'/><b> Bedrooms: </b>{property.bedrooms}</li>}
                        {property.carspaces && <li><FaCar size='1.5em'/><b> Car spaces: </b>{property.carspaces}</li>}
                        {property.zone && <li><GiAustralia size='1.5em'/><b> Zone: </b>{property.zone}</li>}
                        {(property.floorSpaceRatio>0) && <li><FaBuilding size='1.5em'/><b> Floor Space Ratio: </b>{property.floorSpaceRatio}</li>}
                        {property.minimumLotSize && <li><IoMdResize size='1.5em'/><b> Minimum Lot Size: </b>{property.minimumLotSize}</li>}
                        {property.landValue && <li><GiReceiveMoney size='1.5em'/><b> Land Value: </b>{property.landValue}</li>}
                        {property.pricePSM && <li><FaFileInvoiceDollar size='1.5em'/><b> Price per m<sup>2</sup>: </b>{property.pricePSM}</li>}
                        {property.priceToLandValue && <li><FaBalanceScale size='1.5em'/><b> Price To Land Value: </b>{property.priceToLandValue}</li>}
                        {property.summaryDescription && <li><FaInfo size='1.5em'/><b> Description: </b>{property.summaryDescription}</li>}      
                    </ul> 
                </div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        property: state.showProperty
    };
};

export default connect(mapStateToProps)(PropertyInformation);

