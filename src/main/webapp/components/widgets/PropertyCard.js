import React from 'react';
import './PropertyCard';
import { FaBed, FaBath, FaCar, FaChartArea, FaBuilding, FaLink } from 'react-icons/fa';
import { GiReceiveMoney, GiAustralia } from 'react-icons/gi';
import { IoMdPricetags, IoMdClose } from 'react-icons/io';
import { DEFAULT_HOUSE_IMAGE } from '../../constants/constants';
import { connect } from 'react-redux';

class PropertyCard extends React.Component {

handleClose = () => {
    this.props.dispatch({type: 'CLOSE_PROPERTY'})
}

    render () {
        const { propertyData } = this.props;
            return (

                <div>
                    <ul className='propertyInformation col-lg-4'>
                        <li className='justify-content-between' style={{display: 'flex'}}>
                            <h4>Property ID: {this.props.propertyData.id}</h4>
                            <IoMdClose size='2em' onClick={this.handleClose}/>
                        </li>
                        <li>
                            <img 
                                src={propertyData.image || DEFAULT_HOUSE_IMAGE} 
                                style={{width: '150px', height: '150px'}}
                            />
                        </li>
                        <li>
                            <IoMdPricetags size='1.5em'/>
                            <b> Price: </b>
                            {propertyData.price}
                        </li>
                        <li>
                            <FaBed size='1.5em'/>
                            <b> Bedrooms: </b>
                            {propertyData.bedroom}
                        </li>
                        <li>
                            <FaBath size='1.5em'/>
                            <b> Bathrooms: </b>
                            {propertyData.bathroom}
                        </li>
                        <li>
                            <FaCar size='1.5em'/>
                            <b> Car spaces: </b>
                            {propertyData.carspace}
                        </li>
                        <li>
                            <FaChartArea size='1.5em'/>
                            <b> Area: </b>
                            {propertyData.area}
                        </li>
                        <li>
                            <GiAustralia size='1.5em'/>
                            <b> Zone: </b>
                            {propertyData.zone}
                        </li>
                        <li>
                            <FaBuilding size='1.5em'/>
                            <b> FSR: </b>
                            {propertyData.fsr}
                        </li>
                        <li>
                            <FaLink size='1.5em'/>
                            <b> Domain URL: </b>
                            <a href='#'>{propertyData.domainurl}</a>
                        </li>
                        <li>
                            <GiReceiveMoney size='1.5em'/>
                            <b> Land Value: </b>
                            {propertyData.landvalue}
                        </li>
                    </ul> 
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        property: state
    };
};

export default connect(mapStateToProps)(PropertyCard);

