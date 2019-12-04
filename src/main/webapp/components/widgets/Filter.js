import React from 'react';
import { withAuth } from '@okta/okta-react';
import fetch from 'isomorphic-fetch';

import './Filter.css';
import SignIn from './SignIn';

export default withAuth(class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHidden: null,
            authenticated: null,
            notifications: []
        };
        this.handleSaveFilter=this.handleSaveFilter.bind(this);
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

    async handleSaveFilter() {
        this.checkAuthentication();

        this.setState({
            isHidden: this.state.authenticated ? false : true
        });

        try {
            const response = await fetch('/api/notifications', {
            // const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                'planningZone': 'R5',
                'propertyAreaMin': 1
              })
            });

            const data = await response.json();
            console.dir({ data });
      
            this.setState({ notifications : JSON.stringify(data) });
          } catch (err) {
            console.log('error');   
            console.log('API: /notifications - POST');
          }
    }

    handleClose () {
        this.setState ({
            isHidden: false
        });
    }


    render () {
   
        return (
            <div>
            <div className='col-lg-9'>
                <p>Filter price
                    <input 
                        type='range' 
                        min='1' 
                        max='999'
                    />
                </p>
                <p>Filter square<br/>
                    <input 
                        type='text' 
                        style={{width: '60px'}} 
                        placeholder='min'
                    /> - 
                    <input type='text' style={{width: '60px'}} placeholder='max'/>
                </p> 
                <p>Filter area              
                    <input type='text'/>
                </p>
                <p>Filter price per m<sup>2</sup>
                    <input type='text'/>
                </p>
                <button>Search</button>
                <button onClick={this.handleSaveFilter}>Save preferences</button>
            </div>
            {this.state.isHidden && <SignIn onClick={this.handleClose.bind(this)}/>}
            </div>
        );
    }
}

);