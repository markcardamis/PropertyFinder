import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import "react-tabs/style/react-tabs.css";

import SavedFilters from './SavedFilters';
import SignIn from './SignIn';
import Filter from './Filter';

class FilterWidget extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            // tabIndex: 0 
            authenticated: null,
            isHidden: null
        };
        this.checkAuthentication();
    }

    checkAuthentication = async () => {
            const authenticated = await this.props.auth.isAuthenticated();

            if (authenticated !== this.state.authenticated) {
                this.setState({ authenticated });
              }
        }

    handleClose = () => {
        this.setState ({
            isHidden: false
        });
    }

    handleClick = () => {
        this.props.dispatch({type: 'CLOSE_FILTER'});
    }

    
    saveNewFilter = async () => {
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

    handleSave = async () => {
        this.checkAuthentication();

        this.setState({
            isHidden: this.state.authenticated ? false : true
            });

        this.saveNewFilter();
        }

        // handleSaveEditedFilter = async (item) => {
        //     try {
        //         const response = await fetch(`/api/notifications/${item.id}`, {
        //             method: 'PUT',
        //             body: JSON.stringify({
        //               'propertyZone': item.propertyZone,
        //               'propertyAreaMin': item.propertyAreaMin,
        //               'propertyAreaMax': item.propertyAreaMax,
        //               'propertyPriceMin': item.propertyPriceMin,
        //               'propertyPriceMax': item.propertyPriceMax,
        //               'propertyPricePSMMin': item.propertyPricePSMMin,
        //               'propertyPricePSMMax': item.propertyPricePSMMax,
        //               'propertyPostCode': item.propertyPostCode,
        //               'propertyPriceToLandValueMin': item.propertyPriceToLandValueMin,
        //               'propertyPriceToLandValueMax': item.propertyPriceToLandValueMax,
        //               'propertyFloorSpaceRatioMin': item.propertyFloorSpaceRatioMin,
        //               'propertyFloorSpaceRatioMax': item.propertyPriceToLandValueMin
        //             }),
        //             headers: {
        //               Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        //             }
        //         });
        //         const data = await response.json();
        //         console.dir({ data });
        //         //   this.setState({ notifications : JSON.stringify(data) });
        //         // this.setState({ notifications : data });
        //     } catch (err) {
        //       console.log('error editing filter');
        //     }
        // }


    componentDidUpdate() {
        this.checkAuthentication();
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
                            <Filter onClick={this.handleSave}/>
                        </TabPanel>
                        <TabPanel>
                            <SavedFilters/>
                        </TabPanel>
                    </Tabs>
                    <IoMdClose size='2em' onClick={this.handleClick}/>
                </div>
                {this.state.isHidden && <SignIn onClick={this.handleClose}/>}
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
    
