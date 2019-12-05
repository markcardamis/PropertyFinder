import React, { Component } from 'react';
import Login from '../components/auth/Login';
import Registration from '../components/auth/Registration';
import { Tabs, Tab } from 'react-bootstrap-tabs';

class LoginPage extends Component {
    render() {
        return (
            <div className='row col-lg-12 justify-content-center'>
                <Tabs>
                    <Tab label='Sign In'>
                        <div className='login col-lg-3'>
                            <Login baseUrl='https://dev-842802.okta.com' />
                        </div>
                    </Tab>
                    <Tab label='Registration'>
                        <div className='login col-lg-3'>
                            <Registration/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }

}
    export default LoginPage;