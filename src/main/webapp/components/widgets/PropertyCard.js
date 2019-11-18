import React from 'react';
import './PropertyCard';
import { FaBed, FaBath, FaCar, FaChartArea, FaBuilding, FaLink } from 'react-icons/fa';
import { GiReceiveMoney, GiAustralia } from 'react-icons/gi';
import { IoMdPricetags, IoMdClose } from 'react-icons/io';

class PropertyCard extends React.Component {
    render () {
        return (
            <div className='propertyInformation col-lg-4'>
                    <h4>Property ID: {this.props.id}</h4>
                    <img src='https://www.vestnorden.com/wp-content/uploads/2018/03/house-placeholder.png'/><br/>
                    <IoMdPricetags size='1.5em'/><b> Price: </b>Position.price<br/>
                    <FaBed size='1.5em'/><b> Bedrooms: </b>some number<br/>
                    <FaBath size='1.5em'/><b> Bathrooms: </b>some number<br/>
                    <FaCar size='1.5em'/><b> Car spaces: </b>some number<br/>
                    <FaChartArea size='1.5em'/><b> Area: </b>Position.area<br/>
                    <GiAustralia size='1.5em'/><b> Zone: </b>Position.zone<br/>
                    <FaBuilding size='1.5em'/><b> FSR: </b>Position.fsr<br/>
                    <FaLink size='1.5em'/><b> Domain URL: </b><a href='#'>Position.listingURL</a><br/>
                    <GiReceiveMoney size='1.5em'/><b> Land Value: </b>Position.landValue<br/>
            </div>
        )
    }
}

export default PropertyCard;