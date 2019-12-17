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
// import { displayFilterParameters } from '../../shared/methods/displayFilterParameters';
// import { listSavedFilters } from '../../shared/api/api';



class FilterWidget extends Component {

    constructor(props) {
                super(props);
                this.state = { 
                    // tabIndex: 0 
                    authenticated: null,
                    isHidden: null,
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

        handleEditFilter = async (item) => {
        console.log('edit filter works');
        console.log(item);

            try {
                const response = await fetch(`/api/listing/notifications/${item.id}`, {
                headers: {
                    Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
                }
            });
                const data = await response.json();
                this.displayFilterParameters(data);
                this.setState({editedFilter: data})
            } catch (err) {
                console.log('error loading list of filters');
            };


          }

          displayFilterParameters = (item) => {
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
                
        saveFilter = async (method) => {
            this.setState({editedFilter: 'test'});
            console.log('saved new filter')
            console.log(this.props)
            const value = this.props.filter.form.filter.values
            console.log(value);
            try {
                const response = await fetch('/api/notifications', {
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

    handleSave = async (values) => {
        console.log(values)
        console.log('saved')

        this.checkAuthentication();            
        this.setState({
            isHidden: this.state.authenticated ? false : true
            });
//listSavedFilters
            try {
                const response = await fetch('/api/notifications', {
                  headers: {
                      Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
                  }
              });
              const data = await response.json();
              console.dir({ data });
              console.log('successfully loaded list of filters');
        
              //   this.setState({ notifications : JSON.stringify(data) });
              this.setState({ savedFilters : data });
            } catch (err) {
                console.log('error loading list of filters');
            }

        console.log(this.state.savedFilters);

        const result = this.state.savedFilters.find( filter => filter.id === this.state.editedFilter.id );
        console.log('result is: '+result);
        result ? this.saveFilter('PUT') : this.saveFilter('POST');
        }

    handleClose = () => {
        this.setState ({
            isHidden: false
        });
    }

    handleClick = () => {
        this.props.dispatch({type: 'CLOSE_FILTER'});
    } 

    componentDidMount() {
        this.checkAuthentication();
    }

    sendCenterCoordinates = async () => {
        try {
          const response = await fetch(`/api/listing`, {
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

    handleSubmit = async (value) => {
        this.sendCenterCoordinates();

        console.log(value);
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
          console.dir({ data });

          this.props.dispatch({
            type: 'MARKERS',
            payload: data
          })
      } catch (err) {
          console.log('error loading list of filters');
      }
        
    }

    render () {
        return (
            <div className='filterWidget'>
                <div className='d-flex justify-content-between'>
                    <Tabs>
                        <TabList>
                            <Tab>Search</Tab>
                            <Tab>Saved Filters</Tab>
                        </TabList>
                        <TabPanel>
                            <Filter onSubmit={this.handleSubmit} onClick={this.handleSave}/>
                        </TabPanel>
                        <TabPanel>
                            <SavedFilters onClick={this.handleEditFilter}/>
                        </TabPanel>
                    </Tabs>
                    <IoMdClose size='2em' onClick={this.handleClick}/>
                </div>
                {console.log(this.props)}
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