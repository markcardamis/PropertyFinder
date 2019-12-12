import React, { Component } from 'react';
import Login from '../components/auth/Login';
import Registration from '../components/auth/RegistrationForm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


class LoginPage extends Component {
    render() {
        return (
            <div className='row col-lg-12 justify-content-center'>
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