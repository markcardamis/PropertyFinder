import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { connect } from 'react-redux';
import { IoMdClose } from 'react-icons/io';

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

    render () {

        return (
            <div className='filterWidget'>
                <div className='d-flex justify-content-between'>
                    <Tabs>
                        <Tab label='Search'>
                            <Filter/>
                        </Tab>
                        <Tab label='Saved Filters'>
                            <SavedFilters/>
                        </Tab>
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
