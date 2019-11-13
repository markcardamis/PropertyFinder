import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
// import './Filter';
import './Filter.css';
import SignIn from './SignIn';


export default withAuth(class Filter extends Component {
    constructor(props) {
        super(props);
        this.state= {
            // showSignIn: true,
            displaySignIn: 'none',
            authenticated: null
        }
        this.handleSignIn=this.handleSignIn.bind(this);
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

    handleSignIn () {
        this.checkAuthentication();

            this.state.authenticated === true ?
                this.setState({
                    displaySignIn: 'none'
                })
            : 
                this.setState({
                    displaySignIn: 'block'
                })
    }


    render () {

        return (
            <div>
            <div className='filterWidget col-lg-2' style={{display: this.props.displayFilter}}>
                <p>Filter price
                    <input type='range' min='1' max='999'/>
                </p>
                <p>Filter square<br/>
                    <input type='text' style={{width: '60px'}} placeholder='min'/> - 
                    <input type='text' style={{width: '60px'}} placeholder='max'/>
                </p> 
                <p>Filter area              
                    <input type='text'/>
                </p>
                <p>Filter price per m<sup>2</sup>
                    <input type='text'/>
                </p>
                <button>Search</button>
                <button onClick={this.handleSignIn}>Save this filter</button>
            </div>
            <SignIn displaySignIn={this.state.displaySignIn}/>
            </div>
        )
    }
}
)