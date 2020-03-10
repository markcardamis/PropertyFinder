import React, { useState, useEffect } from 'react';
import { withAuth } from '@okta/okta-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { change, formValueSelector } from 'redux-form';
import "react-tabs/style/react-tabs.css";

import SavedFiltersTab from './SavedFiltersTab';
import FilterTab from './FilterTab';
import { FILTER_PARAMETERS } from '../../../shared/constants';
import CloseBtn from '../../buttons/closeBtn/CloseBtn';


  let Filter = (props) => {

    const [tabIndex, setTabIndex] = useState(0);
    const [authenticated, setAuthentication] = useState(null);
    const [editedFilter, setEditedFilter] = useState([]);
    const [savedFilters, setSavedFilters] = useState([]);

    const checkAuthentication = async () => {
      const authenticated = await props.auth.isAuthenticated();
      
      if (authenticated !== authenticated) {
        // this.setState({ authenticated });
        setAuthentication(authenticated);
      }
    };

    // componentDidMount() {
    //   checkAuthentication();
    // }
    useEffect(() => {
      checkAuthentication();
    });

   const handleSelectFilter = async (item) => {
      displayFilterValues(item);
      //this.setState({ tabIndex : 0 });
      setTabIndex(0);
  
      try {
        const response = await fetch(`/api/listing/notifications/${item.id}`, {
          headers: {
            Authorization: 'Bearer ' + await props.auth.getAccessToken()
          }
        });
        const data = await response.json();
        props.dispatch({type: 'MARKERS', payload: data});

      } catch (err) {
        // add notification;
      }
    };

    const handleEditFilter = async (item) => {
      //this.setState({editedFilter: item, tabIndex : 0});
      setEditedFilter(item);
      setTabIndex(0);
      displayFilterValues(item);

        try {
          const response = await fetch(`/api/listing/notifications/${item.id}`, {
            headers: {
              Authorization: 'Bearer ' + await props.auth.getAccessToken()
            }
          });
          const data = await response.json();
        } catch (err) {
          // add notification
        }
    };


    const displayFilterValues = (item) => {
      for (const prop in item) {
        props.dispatch(change('filter', `${prop}`, item[prop]));
      }    
    };
                
    const saveFilter = async (method, path) => {
      try {
        const response = await fetch(path, {
          method: method,
          headers: {
            Authorization: 'Bearer ' + await props.auth.getAccessToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'propertyZone': props.propertyZone,
            'propertyAreaMin': props.propertyAreaMin,
            'propertyAreaMax': props.propertyAreaMax,
            'propertyPriceMin': props.propertyPriceMin,
            'propertyPriceMax': props.propertyPriceMax,
            'propertyPricePSMMin': props.propertyPricePSMMin,
            'propertyPricePSMMax': props.propertyPricePSMMax,
            'propertyPostCode': props.propertyPostCode,
            'propertyPriceToLandValueMin': props.propertyPriceToLandValueMin,
            'propertyPriceToLandValueMax': props.propertyPriceToLandValueMax,
            'propertyFloorSpaceRatioMin': props.propertyFloorSpaceRatioMin,
            'propertyFloorSpaceRatioMax': props.propertyFloorSpaceRatioMax
          })
        });

        const data = await response.json();
      } catch (err) {
        // add notification 
      }
    }

    const handleSaveFilter = async (values) => {
      checkAuthentication();    

      if (authenticated == true) {

            try {
              const response = await fetch('/api/notifications', {
                headers: {
                    Authorization: 'Bearer ' + await props.auth.getAccessToken()
                }
              });
              const data = await response.json();
              //this.setState({ savedFilters : data });
              setSavedFilters(data);
            } catch (err) {
              // add notification
            }

        const result = savedFilters.find( filter => filter.id === editedFilter.id );
        result ? await saveFilter('PUT', `/api/notifications/${editedFilter.id}`) : await saveFilter('POST', '/api/notifications');
      
        //this.setState({ editedFilter: [], tabIndex : 1 });
        setEditedFilter([]);
        setTabIndex(1);
      } else {
        props.dispatch({type: 'SHOW_SIGNIN'});
    }
  };


    const handleSubmit = async () => {

      let headers = {
        'Content-Type': 'application/json',
        'centreLatitude': props.filter.viewport.latitude,
        'centreLongitude': props.filter.viewport.longitude
      };
      headers = authenticated===false ?  
          headers : { ...headers, 'Authorization': 'Bearer ' + await props.auth.getAccessToken()}

      
      try {

        const response = await fetch('/api/listing/query', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            'propertyZone': props.propertyZone ? props.propertyZone : null,
            'propertyAreaMin': props.propertyAreaMin ? props.propertyAreaMin : null,
            'propertyAreaMax': props.propertyAreaMax ? props.propertyAreaMax : null,
            'propertyPriceMin': props.propertyPriceMin ? props.propertyPriceMin : null,
            'propertyPriceMax': props.propertyPriceMax ? props.propertyPriceMax : null,
            'propertyPricePSMMin': props.propertyPricePSMMin ? props.propertyPricePSMMin : null,
            'propertyPricePSMMax': props.propertyPricePSMMax ? props.propertyPricePSMMax : null,
            'propertyPostCode': props.propertyPostCode ? props.propertyPostCode : null,
            'propertyPriceToLandValueMin': props.propertyPriceToLandValueMin ? props.propertyPriceToLandValueMin : null,
            'propertyPriceToLandValueMax': props.propertyPriceToLandValueMax ? props.propertyPriceToLandValueMax : null,
            'propertyFloorSpaceRatioMin': props.propertyFloorSpaceRatioMin ? props.propertyFloorSpaceRatioMin : null,
            'propertyFloorSpaceRatioMax': props.propertyFloorSpaceRatioMax ? props.propertyFloorSpaceRatioMax : null
          })
        });

        const data = await response.json();    
        props.dispatch({type: 'MARKERS', payload: data});

      } catch (err) {
        // add notification  
      }
    }

    const { handleCloseFilter } = props;

      return (
        <div className='filterWidget'>
          <CloseBtn onClick={handleCloseFilter}/>
          <div>
            <Tabs selectedIndex={tabIndex} onSelect={tabIndex => setTabIndex(tabIndex)}>
              <TabList>
                <Tab>Search</Tab>
                <Tab disabled={!authenticated}>Saved Filters</Tab>
              </TabList>
              <TabPanel>
                <FilterTab onSubmit={handleSubmit} handleSaveFilter={handleSaveFilter}/>
              </TabPanel>
              <TabPanel>
                <SavedFiltersTab handleSelectFilter={handleSelectFilter} handleEditFilter={handleEditFilter}/>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      );
   };

const mapStateToProps = (state) => {
  return {
    filter: state
  };
};

const selector = formValueSelector('filter');
Filter = connect(state => {
 
  const { propertyZone, propertyAreaMin, propertyAreaMax, propertyPriceMin, propertyPriceMax,
        propertyPricePSMMin, propertyPricePSMMax, propertyPostCode, propertyPriceToLandValueMin,
        propertyPriceToLandValueMax, propertyFloorSpaceRatioMin,propertyFloorSpaceRatioMax
        } = selector(state, ...FILTER_PARAMETERS);

  return {
        propertyZone, propertyAreaMin, propertyAreaMax, propertyPriceMin, propertyPriceMax,
        propertyPricePSMMin, propertyPricePSMMax, propertyPostCode, propertyPriceToLandValueMin,
        propertyPriceToLandValueMax, propertyFloorSpaceRatioMin, propertyFloorSpaceRatioMax
    };
    
  })(Filter);

export default withAuth(connect(mapStateToProps)(Filter));