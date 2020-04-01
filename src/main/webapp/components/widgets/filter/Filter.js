// import React, { useState, useEffect } from 'react';
// import { withAuth } from '@okta/okta-react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import { connect } from 'react-redux';
// import { IoMdClose } from 'react-icons/io';
// import { change, formValueSelector } from 'redux-form';
// import "react-tabs/style/react-tabs.css";

// import SavedFiltersTab from './SavedFiltersTab';
// import FilterTab from './FilterTab';
// import { FILTER_PARAMETERS } from '../../../shared/constants';
// import CloseBtn from '../../buttons/closeBtn/CloseBtn';


//   let Filter = (props) => {

//     const [tabIndex, setTabIndex] = useState(0);
//     const [authenticated, setAuthentication] = useState(null);
//     const [editedFilter, setEditedFilter] = useState([]);
//     const [savedFilters, setSavedFilters] = useState([]);

//     const checkAuthentication = async () => {
//       const authenticated = await props.auth.isAuthenticated();
      
//       if (authenticated !== authenticated) {
//         // this.setState({ authenticated });
//         setAuthentication(authenticated);
//       }
//     };

//     // componentDidMount() {
//     //   checkAuthentication();
//     // }
//     useEffect(() => {
//       checkAuthentication();
//     });

//    const handleSelectFilter = async (item) => {
//       displayFilterValues(item);
//       //this.setState({ tabIndex : 0 });
//       setTabIndex(0);
  
//       try {
//         const response = await fetch(`/api/listing/notifications/${item.id}`, {
//           headers: {
//             Authorization: 'Bearer ' + await props.auth.getAccessToken()
//           }
//         });
//         const data = await response.json();
//         props.dispatch({type: 'MARKERS', payload: data});

//       } catch (err) {
//         // add notification;
//       }
//     };

//     const handleEditFilter = async (item) => {
//       //this.setState({editedFilter: item, tabIndex : 0});
//       setEditedFilter(item);
//       setTabIndex(0);
//       displayFilterValues(item);

//         try {
//           const response = await fetch(`/api/listing/notifications/${item.id}`, {
//             headers: {
//               Authorization: 'Bearer ' + await props.auth.getAccessToken()
//             }
//           });
//           const data = await response.json();
//         } catch (err) {
//           // add notification
//         }
//     };


//     const displayFilterValues = (item) => {
//       for (const prop in item) {
//         props.dispatch(change('filter', `${prop}`, item[prop]));
//       }    
//     };
                
//     const saveFilter = async (method, path) => {
//       try {
//         const response = await fetch(path, {
//           method: method,
//           headers: {
//             Authorization: 'Bearer ' + await props.auth.getAccessToken(),
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             'propertyZone': props.propertyZone,
//             'propertyAreaMin': props.propertyAreaMin,
//             'propertyAreaMax': props.propertyAreaMax,
//             'propertyPriceMin': props.propertyPriceMin,
//             'propertyPriceMax': props.propertyPriceMax,
//             'propertyPricePSMMin': props.propertyPricePSMMin,
//             'propertyPricePSMMax': props.propertyPricePSMMax,
//             'propertyPostCode': props.propertyPostCode,
//             'propertyPriceToLandValueMin': props.propertyPriceToLandValueMin,
//             'propertyPriceToLandValueMax': props.propertyPriceToLandValueMax,
//             'propertyFloorSpaceRatioMin': props.propertyFloorSpaceRatioMin,
//             'propertyFloorSpaceRatioMax': props.propertyFloorSpaceRatioMax
//           })
//         });

//         const data = await response.json();
//       } catch (err) {
//         // add notification 
//       }
//     }

//     const handleSaveFilter = async (values) => {
//       checkAuthentication();    

//       if (authenticated == true) {

//             try {
//               const response = await fetch('/api/notifications', {
//                 headers: {
//                     Authorization: 'Bearer ' + await props.auth.getAccessToken()
//                 }
//               });
//               const data = await response.json();
//               //this.setState({ savedFilters : data });
//               setSavedFilters(data);
//             } catch (err) {
//               // add notification
//             }

//         const result = savedFilters.find( filter => filter.id === editedFilter.id );
//         result ? await saveFilter('PUT', `/api/notifications/${editedFilter.id}`) : await saveFilter('POST', '/api/notifications');
      
//         //this.setState({ editedFilter: [], tabIndex : 1 });
//         setEditedFilter([]);
//         setTabIndex(1);
//       } else {
//         props.dispatch({type: 'SHOW_SIGNIN'});
//     }
//   };


//     const handleSubmit = async () => {

//       let headers = {
//         'Content-Type': 'application/json',
//         'centreLatitude': props.filter.viewport.latitude,
//         'centreLongitude': props.filter.viewport.longitude
//       };
//       headers = authenticated===false ?  
//           headers : { ...headers, 'Authorization': 'Bearer ' + await props.auth.getAccessToken()}

//       try {

//         const response = await fetch('/api/listing/query', {
//           method: 'POST',
//           headers: headers,
//           body: JSON.stringify({
//             'propertyZone': props.propertyZone ? props.propertyZone : null,
//             'propertyAreaMin': props.propertyAreaMin ? props.propertyAreaMin : null,
//             'propertyAreaMax': props.propertyAreaMax ? props.propertyAreaMax : null,
//             'propertyPriceMin': props.propertyPriceMin ? props.propertyPriceMin : null,
//             'propertyPriceMax': props.propertyPriceMax ? props.propertyPriceMax : null,
//             'propertyPricePSMMin': props.propertyPricePSMMin ? props.propertyPricePSMMin : null,
//             'propertyPricePSMMax': props.propertyPricePSMMax ? props.propertyPricePSMMax : null,
//             'propertyPostCode': props.propertyPostCode ? props.propertyPostCode : null,
//             'propertyPriceToLandValueMin': props.propertyPriceToLandValueMin ? props.propertyPriceToLandValueMin : null,
//             'propertyPriceToLandValueMax': props.propertyPriceToLandValueMax ? props.propertyPriceToLandValueMax : null,
//             'propertyFloorSpaceRatioMin': props.propertyFloorSpaceRatioMin ? props.propertyFloorSpaceRatioMin : null,
//             'propertyFloorSpaceRatioMax': props.propertyFloorSpaceRatioMax ? props.propertyFloorSpaceRatioMax : null
//           })
//         });

//         const data = await response.json();    
//         props.dispatch({type: 'MARKERS', payload: data});

//       } catch (err) {
//         // add notification  
//       }
//     }

//     const { handleCloseFilter } = props;

//       return (
//         <div className='filterWidget'>
//           <CloseBtn onClick={handleCloseFilter}/>
//           <div>
//             <Tabs selectedIndex={tabIndex} onSelect={tabIndex => setTabIndex(tabIndex)}>
//               <TabList>
//                 <Tab>Search</Tab>
//                 <Tab disabled={!authenticated}>Saved Filters</Tab>
//               </TabList>
//               <TabPanel>
//                 <FilterTab onSubmit={handleSubmit} handleSaveFilter={handleSaveFilter}/>
//               </TabPanel>
//               <TabPanel>
//                 <SavedFiltersTab handleSelectFilter={handleSelectFilter} handleEditFilter={handleEditFilter}/>
//               </TabPanel>
//             </Tabs>
//           </div>
//         </div>
//       );
//    };

// const mapStateToProps = (state) => {
//   return {
//     filter: state
//   };
// };

// const selector = formValueSelector('filter');
// Filter = connect(state => {
 
//   const { propertyZone, propertyAreaMin, propertyAreaMax, propertyPriceMin, propertyPriceMax,
//         propertyPricePSMMin, propertyPricePSMMax, propertyPostCode, propertyPriceToLandValueMin,
//         propertyPriceToLandValueMax, propertyFloorSpaceRatioMin,propertyFloorSpaceRatioMax
//         } = selector(state, ...FILTER_PARAMETERS);

//   return {
//         propertyZone, propertyAreaMin, propertyAreaMax, propertyPriceMin, propertyPriceMax,
//         propertyPricePSMMin, propertyPricePSMMax, propertyPostCode, propertyPriceToLandValueMin,
//         propertyPriceToLandValueMax, propertyFloorSpaceRatioMin, propertyFloorSpaceRatioMax
//     };
    
//   })(Filter);

// export default withAuth(connect(mapStateToProps)(Filter));

import React, { Component } from 'react';
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


class Filter extends Component {

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
        <div className='filterWidget'>
          <CloseBtn onClick={handleCloseFilter}/>
          <div>
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
              <TabList>
                <Tab>Search</Tab>
                <Tab disabled={!authenticated}>Saved Filters</Tab>
              </TabList>
              <TabPanel>
                <FilterTab onSubmit={this.handleSubmit} handleSaveFilter={this.handleSaveFilter}/>
              </TabPanel>
              <TabPanel>
                <SavedFiltersTab handleSelectFilter={this.handleSelectFilter} handleEditFilter={this.handleEditFilter}/>
              </TabPanel>
            </Tabs>
            {/* <IoMdClose size='2em' onClick={handleCloseFilter}/> */}
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