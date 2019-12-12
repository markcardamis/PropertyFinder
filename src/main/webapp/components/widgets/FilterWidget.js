import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import "react-tabs/style/react-tabs.css";

import SavedFilters from './SavedFilters';
import Filter from './Filter';

class FilterWidget extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            // tabIndex: 0 
            authenticated: null,
        };
        this.checkAuthentication();
    }

        // handleAuthenticated = () => {
        //     this.props.dispatch({type: 'AUTHENTICATED'})
        // };
  
        // handleNotAuthenticated = () => {
        //     this.props.dispatch({type: 'NOT_AUTHENTICATED'})
        // };

    checkAuthentication = async () => {
            const authenticated = await this.props.auth.isAuthenticated();

            if (authenticated !== this.state.authenticated) {
                this.setState({ authenticated });
              }
        
            // authenticated ? this.handleAuthenticated() : this.handleNotAuthenticated();
        }
     
    componentDidUpdate() {
        this.checkAuthentication();
    }

    handleClick = () => {
        this.props.dispatch({type: 'CLOSE_FILTER'});
    }

    handleSubmit = async (value) => {

        const emptyQuery = '';
        const zone = value.propertyZone ? ` AND zone:${value.propertyZone}` : '';
        const areaMin = value.propertyAreaMin ? ` AND area>${value.propertyAreaMin}` : '';
        const areaMax = value.propertyAreaMax ? ` AND area<${value.propertyAreaMax}` : '';
        const priceMin = value.propertyPriceMin ? ` AND priceInt>${value.propertyPriceMin}` : '';
        const priceMax = value.propertyPriceMax ? ` AND priceInt>${value.propertyPriceMax}` : '';
        const pricePSMMin = value.propertyPricePSMMin ? ` AND pricePSM>${value.propertyPricePSMMin}` : '';
        const pricePSMMax = value.propertyPricePSMMax ? ` AND pricePSM<${value.propertyPricePSMMax}` : '';
        const postCode = value.propertyPostCode ? ` AND postCode:${value.propertyPostCode}` : '';
        const landvalueMin = value.propertyPriceToLandValueMin ? ` AND priceToLandValue>${value.propertyPriceToLandValueMin}` : '';
        const landvalueMax = value.propertyPriceToLandValueMax ? ` AND priceToLandValue<${value.propertyPriceToLandValueMax}` : '';
        const floorMin = value.propertyFloorSpaceRatioMin ? ` AND floorSpaceRatio>${value.propertyFloorSpaceRatioMin}` : '';
        const floorMax = value.propertyPriceToLandValueMax ? ` AND floorSpaceRatio<${value.propertyFloorSpaceRatioMax}` : '';

        const query = emptyQuery.concat(zone, areaMin, areaMax, priceMin, priceMax, pricePSMMin, pricePSMMax, postCode, landvalueMin, landvalueMax, floorMax, floorMin)

        try {
            const response = await fetch(`/api/listing?search=${query}`, {
          });
          const data = await response.json();

          this.props.dispatch({
            type: 'MARKERS',
            payload: data
          })
      } catch (err) {
          console.log('error loading list of filters');
      }

      sendCenterCoordinates = async () => {
        try {
          const response = await fetch(`/api/listing/${item.id}`, {
            method: 'POST',
            body: JSON.stringify({
              'centreLatitude': this.props.filter.viewport.latitude,
              'centreLongitude': this.props.filter.viewport.longitude
            })
          });
    
          const data = await response.json();
          console.dir(this.props.filter.viewport.longitude);
        } catch (err) {
          console.log('error POST map center coordinates'); 
        }
      }
        
    }

    render () {

        return (
            <div className='filterWidget'>
                <div className='d-flex justify-content-between'>
                    {/* <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}> */}
                        <Tabs>
                        <TabList>
                            <Tab>Search</Tab>
                            <Tab>Saved Filters</Tab>
                        </TabList>
                        <TabPanel>
                            <Filter onSubmit={this.handleSubmit}/>
                        </TabPanel>
                        <TabPanel>
                            <SavedFilters/>
                        </TabPanel>
                    </Tabs>
                    <IoMdClose size='2em' onClick={this.handleClick}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state
    };
};

export default withAuth(connect(mapStateToProps)(FilterWidget));
