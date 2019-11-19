import React from 'react';
import './PropertyCard';
import { FaBed, FaBath, FaCar, FaChartArea, FaBuilding, FaLink } from 'react-icons/fa';
import { GiReceiveMoney, GiAustralia } from 'react-icons/gi';
import { IoMdPricetags, IoMdClose } from 'react-icons/io';
import { DEFAULT_HOUSE_IMAGE } from '../../constants';

class PropertyCard extends React.Component {
    render () {
        const { property } = this.props
            return (
                <div>
                    <ul className='propertyInformation col-lg-4'>
                        <li>
                            <h4>Property ID: {property.id}</h4>
                        </li>
                        <li>
                            <img 
                                src={property.image || DEFAULT_HOUSE_IMAGE} 
                                style={{width: '150px', height: '150px'}}
                            />
                        </li>
                        <li>
                            <IoMdPricetags size='1.5em'/>
                            <b> Price: </b>
                            {property.price}
                        </li>
                        <li>
                            <FaBed size='1.5em'/>
                            <b> Bedrooms: </b>
                            {property.bedroom}
                        </li>
                        <li>
                            <FaBath size='1.5em'/>
                            <b> Bathrooms: </b>
                            {property.bathroom}
                        </li>
                        <li>
                            <FaCar size='1.5em'/>
                            <b> Car spaces: </b>
                            {property.carspace}
                        </li>
                        <li>
                            <FaChartArea size='1.5em'/>
                            <b> Area: </b>
                            {property.area}
                        </li>
                        <li>
                            <GiAustralia size='1.5em'/>
                            <b> Zone: </b>
                            {property.zone}
                        </li>
                        <li>
                            <FaBuilding size='1.5em'/>
                            <b> FSR: </b>
                            {property.fsr}
                        </li>
                        <li>
                            <FaLink size='1.5em'/>
                            <b> Domain URL: </b>
                            <a href='#'>{property.domainurl}</a>
                        </li>
                        <li>
                            <GiReceiveMoney size='1.5em'/>
                            <b> Land Value: </b>
                            {property.landvalue}
                        </li>
                    </ul>    
                </div>
            )
    }
}

export default PropertyCard;