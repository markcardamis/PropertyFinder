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
        // tabIndex: 0 
        authenticated: null,
        savedFilters: [],
        editedFilter: []
      };
      this.checkAuthentication();
    }


    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    handleSelectFilter = async (item) => {
      this.displayFilterValues(item);
  
      try {
        const response = await fetch(`/api/listing/notifications/${item.id}`, {
          headers: {
            Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
          }
        });
        const data = await response.json();
        this.props.dispatch({type: 'MARKERS', payload: data});

      } catch (err) {
        console.log('error loading list of filters');
      }
    }

    handleEditFilter = async (item) => {
      this.setState({editedFilter: item});
      this.displayFilterValues(item);

      try {
        const response = await fetch(`/api/listing/notifications/${item.id}`, {
          headers: {
            Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
          }
        });
        const data = await response.json();

      } catch (err) {
        console.log('error loading list of filters');
      };
    }

    displayFilterValues = (item) => {
      this.props.dispatch(change('filter', 'propertyZone', item.propertyZone));
      this.props.dispatch(change('filter', 'propertyAreaMin', item.propertyAreaMin));
      this.props.dispatch(change('filter', 'propertyAreaMax', item.propertyAreaMax));
      this.props.dispatch(change('filter', 'propertyPriceMin', item.propertyPriceMin));
      this.props.dispatch(change('filter', 'propertyPriceMax', item.propertyPriceMax));
      this.props.dispatch(change('filter', 'propertyPricePSMMin', item.propertyPricePSMMin));
      this.props.dispatch(change('filter', 'propertyPricePSMMax', item.propertyPricePSMMax));
      this.props.dispatch(change('filter', 'propertyPostCode', item.propertyPostCode));
      this.props.dispatch(change('filter', 'propertyPriceToLandValueMin', item.propertyPriceToLandValueMin));
      this.props.dispatch(change('filter', 'propertyPriceToLandValueMax', item.propertyPriceToLandValueMax));
      this.props.dispatch(change('filter', 'propertyFloorSpaceRatioMin', item.propertyFloorSpaceRatioMin));
      this.props.dispatch(change('filter', 'propertyFloorSpaceRatioMax', item.propertyPriceToLandValueMin));
    };
                
    saveFilter = async (method, path) => {
      console.log('saved new filter')
      console.log(this.props)
      const value = this.props.filter.form.filter.values
      console.log(value);
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
        console.dir({ data });

        this.setState({ notifications : JSON.stringify(data) });
      } catch (err) {
        console.log('error API: filter - POST/PUT');   
      }
    }

    handleSaveFilter = async (values) => {

      this.checkAuthentication();            
      this.state.authenticated ? null : this.props.dispatch({type: 'SHOW_SIGNIN'});

        try {
          const response = await fetch('/api/notifications', {
            headers: {
                Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
            }
          });
          const data = await response.json();
          console.dir({ data });
          console.log('successfully loaded list of filters');
          this.setState({ savedFilters : data });
        } catch (err) {
          console.log('error loading list of filters');
        }

        const result = this.state.savedFilters.find( filter => filter.id === this.state.editedFilter.id );
        result ? this.saveFilter('PUT', `/api/notifications/${this.state.editedFilter.id}`) : this.saveFilter('POST', '/api/notifications');
      
      this.setState({ editedFilter: [] });
    }

    componentDidMount() {
      this.checkAuthentication();
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
        const response = await fetch('/api/listing/notifications', {
          method: 'POST',
          headers: headers,
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
        this.props.dispatch({
          type: 'MARKERS',
          payload: data
        });
      } catch (err) {
        console.log('error searching ');   
      }
    }

    render () {
        const { handleCloseFilter } = this.props;
        const { authenticated } = this.state;

      return (
        <div className='filterWidget'>
          <div className='d-flex justify-content-between'>
            <Tabs>
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