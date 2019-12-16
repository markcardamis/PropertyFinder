import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { change, formValueSelector } from 'redux-form';
import "react-tabs/style/react-tabs.css";

import SavedFilters from './SavedFilters';
import Filter from './Filter';
import { FILTER_PARAMETERS } from '../../constants/constants'


class FilterWidget extends Component {

    constructor(props) {
                super(props);
                this.state = { 
                    // tabIndex: 0 
                    authenticated: null,
                    isHidden: null,
                    editedFilter: null
                };
                this.checkAuthentication();
            }


        checkAuthentication = async () => {
            const authenticated = await this.props.auth.isAuthenticated();
           
            if (authenticated !== this.state.authenticated) {
                this.setState({ authenticated });
              }
        }

        handleEditFilter = (item) => {
        console.log('edit filter works');
        console.log(item);

        // this.setState({editedFilter: item})

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
          }

                
        saveNewFilter = async () => {
            this.setState({editedFilter: 'test'});
            console.log('saved new filter')
            console.log(this.props)
            const value = this.props.filter.form.filter.values
            console.log(value);
            try {
                const response = await fetch('/api/notifications', {
                    method: 'POST',
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
                console.log('error API: filter - POST');   
            }
        }

        saveEditedFilter = async (item) => {
            console.log('save edited filter')
            console.log(item);
            try {
                const response = await fetch(`/api/notifications/${item.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                      'propertyZone': item.propertyZone,
                      'propertyAreaMin': item.propertyAreaMin,
                      'propertyAreaMax': item.propertyAreaMax,
                      'propertyPriceMin': item.propertyPriceMin,
                      'propertyPriceMax': item.propertyPriceMax,
                      'propertyPricePSMMin': item.propertyPricePSMMin,
                      'propertyPricePSMMax': item.propertyPricePSMMax,
                      'propertyPostCode': item.propertyPostCode,
                      'propertyPriceToLandValueMin': item.propertyPriceToLandValueMin,
                      'propertyPriceToLandValueMax': item.propertyPriceToLandValueMax,
                      'propertyFloorSpaceRatioMin': item.propertyFloorSpaceRatioMin,
                      'propertyFloorSpaceRatioMax': item.propertyPriceToLandValueMin
                    }),
                    headers: {
                      Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
                    }
                });
                const data = await response.json();
                console.dir({ data });
                //   this.setState({ notifications : JSON.stringify(data) });
                // this.setState({ notifications : data });
            } catch (err) {
              console.log('error editing filter');
            }
        }

        handleSave = async (values) => {
            console.log(values)
                        console.log('saved')

                    this.checkAuthentication();
            
                    this.setState({
                        isHidden: this.state.authenticated ? false : true
                        });

                    this.state.editedFilter===null ? this.saveNewFilter(values) : this.saveEditedFilter(values);
                    }

        handleClose = () => {
        this.setState ({
            isHidden: false
        });
    }

    handleClick = () => {
        this.props.dispatch({type: 'CLOSE_FILTER'});
    }

    // async handleSelectFilter(item) {
    //     console.log('select filter works')
    //     try {
    //           const response = await fetch(`/api/listing/notifications/${item.id}`, {
    //             headers: {
    //                 Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
    //             }
    //         });
    //           const data = await response.json();
    //           this.displayFilterParameters(item);
    //         } catch (err) {
    //             console.log('error loading list of filters');
    //         };
    //     }


// displayFilterParameters = (item) => {
//             console.log(this.props)
//             console.log(item)
//             this.props.dispatch(change('filter', 'propertyZone', item.propertyZone));
//             this.props.dispatch(change('filter', 'propertyAreaMin', item.propertyAreaMin));
//             this.props.dispatch(change('filter', 'propertyAreaMax', item.propertyAreaMax));
//             this.props.dispatch(change('filter', 'propertyPriceMin', item.propertyPriceMin));
//             this.props.dispatch(change('filter', 'propertyPriceMax', item.propertyPriceMax));
//             this.props.dispatch(change('filter', 'propertyPricePSMMin', item.propertyPricePSMMin));
//             this.props.dispatch(change('filter', 'propertyPricePSMMax', item.propertyPricePSMMax));
//             this.props.dispatch(change('filter', 'propertyPostCode', item.propertyPostCode));
//             this.props.dispatch(change('filter', 'propertyPriceToLandValueMin', item.propertyPriceToLandValueMin));
//             this.props.dispatch(change('filter', 'propertyPriceToLandValueMax', item.propertyPriceToLandValueMax));
//             this.props.dispatch(change('filter', 'propertyFloorSpaceRatioMin', item.propertyFloorSpaceRatioMin));
//             this.props.dispatch(change('filter', 'propertyFloorSpaceRatioMax', item.propertyPriceToLandValueMin));
//         }        

    componentDidMount() {
        this.checkAuthentication();
    }
      
    componentDidUpdate() {
        this.checkAuthentication();
    }

    handleSubmit = async (value) => {
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
            //   headers: {
            //       Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
            //   }
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