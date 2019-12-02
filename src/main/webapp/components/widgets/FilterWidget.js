import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { connect } from 'react-redux';

import SavedFilters from './SavedFilters';
import Filter from './Filter';
import { IoMdClose } from 'react-icons/io';

class FilterWidget extends Component {

    constructor(props) {
        super(props);
        this.state= {
            authenticated: null
        };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
        }
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
                    <IoMdClose size='2em' onClick={()=>this.props.dispatch({type: 'CLOSE_FILTER'})}/>
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
