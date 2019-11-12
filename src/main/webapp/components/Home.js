import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import Map from './map/Map';
import { GiMagnifyingGlass} from 'react-icons/gi';
import PropertyCard from './widgets/PropertyCard';
import Filter from './widgets/Filter';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
          authenticated: null,
          showFilter: true,
          displayFilter: 'none',
          };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.toggleFilter=this.toggleFilter.bind(this);
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

  toggleFilter () {

    this.setState((prevstate)=>({
        showFilter: !prevstate.showFilter,
        displayFilter: this.state.showFilter ? 'block' : 'none'
      }));
  }

 

  render() {
    if (this.state.authenticated === null) return null;
    console.log(this.state.displayFilter)
    console.log(this.state.showFilter)


    const button = this.state.authenticated ?
      <button className='loginButton' onClick={() => {this.props.auth.logout()}}>Logout</button> :
      <button className='loginButton' onClick={() => {this.props.auth.login()}}>Login</button>;

    return (
      <div>
        {button}
        <button className='searchButton' onClick={this.toggleFilter}><GiMagnifyingGlass size='2em'/></button>
        <Filter displayFilter={this.state.displayFilter}/>
        <Map/>
        
        </div>
    );
  }

});
