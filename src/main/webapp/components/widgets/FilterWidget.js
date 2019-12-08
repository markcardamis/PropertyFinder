import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import "react-tabs/style/react-tabs.css";

import SavedFilters from './SavedFilters';
import Filter from './Filter';

class FilterWidget extends Component {

        handleAuthenticated = () => {
            this.props.dispatch({type: 'AUTHENTICATED'})
        };
  
        handleNotAuthenticated = () => {
            this.props.dispatch({type: 'NOT_AUTHENTICATED'})
        };

        handleClick = () => {
            this.props.dispatch({type: 'CLOSE_FILTER'});
        }

        checkAuthentication = async () => {
            const authenticated = await this.props.auth.isAuthenticated();
        
            authenticated ? this.handleAuthenticated() : this.handleNotAuthenticated();
        }

    componentDidMount() {
        this.checkAuthentication();
    }
      
    componentDidUpdate() {
        this.checkAuthentication();
    }

    handleSubmit = (value) => {
        console.log(value)
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
