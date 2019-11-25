import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import SavedFilters from './SavedFilters';
import Filter from './Filter';

export default withAuth(class FilterWidget extends Component {

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
                <Tabs>
                    <Tab label='Search'>
                        <Filter/>
                    </Tab>
                    <Tab label='Saved Filters' disabled={this.state.authenticated ? false : true }>
                        <SavedFilters/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
);