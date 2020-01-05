import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { change, formValueSelector } from 'redux-form';
import "react-tabs/style/react-tabs.css";

import SavedFilters from './SavedFilters';
import Filter from './Filter';
import { FILTER_PARAMETERS } from '../../shared/constants'


class FilterWidget extends Component {

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
      for (const prop in item) {
        this.props.dispatch(change('filter', `${prop}`, item[prop]));
      }    
    };
                
    saveFilter = async (method, path) => {
      try {
        const response = await fetch(path, {
          method: method,
          headers: {
            Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'propertyZone': this.props.propertyZone,
            'propertyAreaMin': this.props.propertyAreaMin,
            'propertyAreaMax': this.props.propertyAreaMax,
            'propertyPriceMin': this.props.propertyPriceMin,
            'propertyPriceMax': this.props.propertyPriceMax,
            'propertyPricePSMMin': this.props.propertyPricePSMMin,
            'propertyPricePSMMax': this.props.propertyPricePSMMax,
            'propertyPostCode': this.props.propertyPostCode,
            'propertyPriceToLandValueMin': this.props.propertyPriceToLandValueMin,
            'propertyPriceToLandValueMax': this.props.propertyPriceToLandValueMax,
            'propertyFloorSpaceRatioMin': this.props.propertyFloorSpaceRatioMin,
            'propertyFloorSpaceRatioMax': this.props.propertyFloorSpaceRatioMax
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

      let headers = {
        'Content-Type': 'application/json',
        'centreLatitude': this.props.filter.viewport.latitude,
        'centreLongitude': this.props.filter.viewport.longitude
      };
      headers = this.state.authenticated===false ?  
          headers : { ...headers, 'Authorization': 'Bearer ' + await this.props.auth.getAccessToken()}

      
      try {

        const response = await fetch('/api/listing/within', {
          headers: headers,
        });
        // const response = await fetch('/api/listing/notifications', {
        //   method: 'POST',
        //   headers: headers,
        //   body: JSON.stringify({
        //     'propertyZone': this.props.propertyZone ? this.props.propertyZone : null,
        //     'propertyAreaMin': this.props.propertyAreaMin ? this.props.propertyAreaMin : null,
        //     'propertyAreaMax': this.props.propertyAreaMax ? this.props.propertyAreaMax : null,
        //     'propertyPriceMin': this.props.propertyPriceMin ? this.props.propertyPriceMin : null,
        //     'propertyPriceMax': this.props.propertyPriceMax ? this.props.propertyPriceMax : null,
        //     'propertyPricePSMMin': this.props.propertyPricePSMMin ? this.props.propertyPricePSMMin : null,
        //     'propertyPricePSMMax': this.props.propertyPricePSMMax ? this.props.propertyPricePSMMax : null,
        //     'propertyPostCode': this.props.propertyPostCode ? this.props.propertyPostCode : null,
        //     'propertyPriceToLandValueMin': this.props.propertyPriceToLandValueMin ? this.props.propertyPriceToLandValueMin : null,
        //     'propertyPriceToLandValueMax': this.props.propertyPriceToLandValueMax ? this.props.propertyPriceToLandValueMax : null,
        //     'propertyFloorSpaceRatioMin': this.props.propertyFloorSpaceRatioMin ? this.props.propertyFloorSpaceRatioMin : null,
        //     'propertyFloorSpaceRatioMax': this.props.propertyFloorSpaceRatioMax ? this.props.propertyFloorSpaceRatioMax : null
        //   })
        // });

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
        <div className='filterWidget'>
          <div>
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
              <TabList>
                <Tab>Search</Tab>
                <Tab disabled={!authenticated}>Saved Filters</Tab>
              </TabList>
              <TabPanel>
                <Filter onSubmit={this.handleSubmit} handleSaveFilter={this.handleSaveFilter}/>
              </TabPanel>
              <TabPanel>
                <SavedFilters handleSelectFilter={this.handleSelectFilter} handleEditFilter={this.handleEditFilter}/>
              </TabPanel>
            </Tabs>
            <IoMdClose size='2em' onClick={handleCloseFilter}/>
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

const selector = formValueSelector("filter");
FilterWidget = connect(state => {
 
  const { propertyZone, propertyAreaMin, propertyAreaMax, propertyPriceMin, propertyPriceMax,
        propertyPricePSMMin, propertyPricePSMMax, propertyPostCode, propertyPriceToLandValueMin,
        propertyPriceToLandValueMax, propertyFloorSpaceRatioMin,propertyFloorSpaceRatioMax
        } = selector(state, ...FILTER_PARAMETERS);

  return {
        propertyZone, propertyAreaMin, propertyAreaMax, propertyPriceMin, propertyPriceMax,
        propertyPricePSMMin, propertyPricePSMMax, propertyPostCode, propertyPriceToLandValueMin,
        propertyPriceToLandValueMax, propertyFloorSpaceRatioMin, propertyFloorSpaceRatioMax
    };
    
  })(FilterWidget);

export default withAuth(connect(mapStateToProps)(FilterWidget));