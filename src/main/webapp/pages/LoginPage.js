import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Registration from '../components/auth/RegistrationForm';
import Login from '../components/auth/Login';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Sign In</Tab>
                        <Tab>Registration</Tab>
                    </TabList>
                    <TabPanel>
                        <Login baseUrl='https://dev-842802.okta.com'/>
                    </TabPanel>
                    <TabPanel>
                        <Registration baseUrl='https://dev-842802.okta.com'/>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }

}
    export default LoginPage;