import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import "react-tabs/style/react-tabs.css";

import SavedFiltersTab from '../../widgets/filter/SavedFiltersTab';
import FilterTab from '../../molecules/filter/FilterTab';
import CloseBtn from '../../buttons/closeBtn/CloseBtn';
import './filterModal.scss'


class FilterModal extends Component {

    constructor(props) {
      super(props);
      this.state = { 
        tabIndex: 0,
        authenticated: null,
        savedFilters: [],
        editedFilter: []
      };
    }

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    componentDidMount() {
      this.checkAuthentication();
    }

    handleSelectFilter = async (item) => {
      this.displayFilterValues(item);
      this.setState({ tabIndex : 0 });
  
      try {
        const response = await fetch(`/api/listing/notifications/${item.id}`, {
          headers: {
            Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
          }
        });
        const data = await response.json();
        this.props.dispatch({type: 'MARKERS', payload: data});

      } catch (err) {
        // add notification;
      }
    }

    handleEditFilter = async (item) => {
      {console.log(item)}
      this.setState({editedFilter: item, tabIndex : 0});
      this.displayFilterValues(item);

        try {
          const response = await fetch(`/api/listing/notifications/${item.id}`, {
            headers: {
              Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
            }
          });
          const data = await response.json();
        } catch (err) {
          // add notification
        };
    }


    displayFilterValues = (item) => {
      console.log(item)
      // for (const prop in item) {
      //   this.props.dispatch(change('filter', `${prop}`, item[prop]));
      // }  
      this.props.dispatch({type: 'FILTER', payload: item})  
    };
                
    saveFilter = async (method, path) => {
      const {zone, area, price, priceM2, postCode, priceLandvalue, floorspaceRatio} = this.props.filter.filter
      try {
        const response = await fetch(path, {
          method: method,
          headers: {
            Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'propertyZone': zone ? zone : null,
            'propertyAreaMin': area[0] !== 0 ? area[0] : null,
            'propertyAreaMax': area[1] !== 20000 ? area[1] : null,
            'propertyPriceMin': price[0] !== 100000 ? price[0] : null,
            'propertyPriceMax': price[1] !== 5000000 ? price[1] : null,
            'propertyPricePSMMin': priceM2[0] !== 1 ? priceM2[0] : null,
            'propertyPricePSMMax': priceM2[1] !== 10000 ? priceM2[1] : null,
            'propertyPostCode': postCode !== '' ? postCode : null,
            'propertyPriceToLandValueMin': priceLandvalue[0] !== 0 ? priceLandvalue[0] : null,
            'propertyPriceToLandValueMax': priceLandvalue[1] !== 10 ? priceLandvalue[1] : null,
            'propertyFloorSpaceRatioMin': floorspaceRatio[0] !== 0 ? floorspaceRatio[0] : null,
            'propertyFloorSpaceRatioMax': floorspaceRatio[1] !== 2 ? floorspaceRatio[1] : null
          })
        });

        const data = await response.json();
      } catch (err) {
        // add notification 
      }
    }

    handleSaveFilter = async (values) => {
      this.checkAuthentication();    

      if (this.state.authenticated == true) {

            try {
              const response = await fetch('/api/notifications', {
                headers: {
                    Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
                }
              });
              const data = await response.json();
              this.setState({ savedFilters : data });
            } catch (err) {
              // add notification
            }

        const result = this.state.savedFilters.find( filter => filter.id === this.state.editedFilter.id );
        result ? await this.saveFilter('PUT', `/api/notifications/${this.state.editedFilter.id}`) : await this.saveFilter('POST', '/api/notifications');
      
        this.setState({ editedFilter: [], tabIndex : 1 });
      } else {
        this.props.dispatch({type: 'SHOW_SIGNIN'})
    }
  }


    handleSubmit = async () => {
      const {zone, area, price, priceM2, postCode, priceLandvalue, floorspaceRatio} = this.props.filter.filter
      let headers = {
        'Content-Type': 'application/json',
        'centreLatitude': this.props.filter.viewport.latitude,
        'centreLongitude': this.props.filter.viewport.longitude
      };
      headers = this.state.authenticated===false ?  
          headers : { ...headers, 'Authorization': 'Bearer ' + await this.props.auth.getAccessToken()}

      
      try {

        const response = await fetch('/api/listing/query', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            'propertyZone': zone ? zone : null,
            'propertyAreaMin': area[0]&&area[0] !== 0 ? area[0] : null,
            'propertyAreaMax': area[1]&&area[1] !== 20000 ? area[1] : null,
            'propertyPriceMin': price[0]&&price[0] !== 100000 ? price[0] : null,
            'propertyPriceMax': price[1]&&price[1] !== 5000000 ? price[1] : null,
            'propertyPricePSMMin': priceM2[0] ? priceM2[0] : null,
            'propertyPricePSMMax': priceM2[1] ? priceM2[1] : null,
            'propertyPostCode': postCode ? postCode : null,
            'propertyPriceToLandValueMin': priceLandvalue[0] ? priceLandvalue[0] : null,
            'propertyPriceToLandValueMax': priceLandvalue[1] ? priceLandvalue[1] : null,
            'propertyFloorSpaceRatioMin': floorspaceRatio[0]&&floorspaceRatio[0] !== 0 ? floorspaceRatio[0] : null,
            'propertyFloorSpaceRatioMax': floorspaceRatio[1]&&floorspaceRatio[1] !== 2 ? floorspaceRatio[1] : null
          })
        });

        const data = await response.json();    
        this.props.dispatch({
          type: 'MARKERS',
          payload: data
        });
      } catch (err) {
        // add notification  
      }
    }

    render () {
        const { handleCloseFilter } = this.props;
        const { authenticated } = this.state;

      return (
        <div className='filterContainer'>
        <div className='filterModal'>
          <CloseBtn/>
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
              <TabList>
                <Tab>Search</Tab>
                <Tab disabled={!authenticated}>Saved Filters</Tab>
              </TabList>
              <TabPanel>
                <FilterTab handleSubmit={this.handleSubmit} handleSaveFilter={this.handleSaveFilter}/>
              </TabPanel>
              <TabPanel>
                <SavedFiltersTab handleSelectFilter={this.handleSelectFilter} handleEditFilter={this.handleEditFilter}/>
              </TabPanel>
            </Tabs>
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

export default withAuth(connect(mapStateToProps)(FilterModal));