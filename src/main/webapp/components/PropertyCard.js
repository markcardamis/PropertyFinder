import React from 'react';
import './PropertyCard';

class PropertyCard extends React.Component {
    render () {
        return (
            <div className='propertyInformation justify-content-right'>
                    <b> Price: </b>Position.price<br/>
                    <b>Zone: </b>Position.zone<br/>
                    <b>FSR: </b>Position.fsr<br/>
                    <b>Price Per Square Meter: </b>Position.pricePerSquareMeter<br/>
                    <b>Price Integer: </b>Position.priceInteger<br/>
                    <b>Land Value Integer: </b>Position.landValue<br/>
                    <b>Area: </b>Position.area<br/>
                    <b>Domain Listed Address: </b>Position.address<br/>
                    <b>Planning Portal Address: </b>Position.planningPortalAddress<br/>
                    <b>Domain URL: </b><a href='#'>Position.listingURL</a><br/>
                    <b>Land Checker URL: </b><a href='#'>Position.landCheckerURL</a><br/>
                    <b>Price Checker URL: </b><a href='#'>Position.priceCheckerURL</a><br/>
                    <b>Selection Reason: </b>Position.selectionReason<br/>
                    <b>Summary: </b>Position.summaryDescription<br/>
            </div>
        )
    }
}

export default PropertyCard;