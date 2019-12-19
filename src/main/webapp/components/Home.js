import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { GiMagnifyingGlass} from 'react-icons/gi';
import { connect } from 'react-redux';

import PropertyInformation from '../components/widgets/PropertyInformation';
import FilterWidget from './widgets/FilterWidget';
import SignIn from './widgets/SignIn';
import Map from './map/Map';

class Home extends Component {
  constructor( props ) {
    super( props );
    this.state = { 
          authenticated: null,
          };
    this.checkAuthentication();
  }
  
  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if ( authenticated !== this.state.authenticated ) {
      this.setState( { authenticated } );
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  toggleFilter = () => {
    this.props.dispatch({type: 'SHOW_FILTER'});
  }

  handleCloseFilter = () => {
    this.props.dispatch({type: 'CLOSE_FILTER'});
  } 

  handleClosePropertyInfo = () => {
    this.props.dispatch({type: 'CLOSE_PROPERTY'})
}

  handleCloseSignIn = () => {
    this.props.dispatch({type: 'CLOSE_SIGNIN'})
}

  render() {
    if ( this.state.authenticated === null ) return null;
  
    const button = this.state.authenticated ?
      <button className='loginButton' onClick={() => {this.props.auth.logout();}}>Logout</button> : 
      <button className='loginButton' onClick={() => {this.props.auth.login();}}>Login</button>;

    return (
      <div>
        {button}
        <button className='searchButton' onClick={this.toggleFilter}>
          <GiMagnifyingGlass size='2em'/>
        </button>
        {this.props.home.showFilter && <FilterWidget handleCloseFilter={this.handleCloseFilter}/>}
        {this.props.home.showProperty.isHidden && <PropertyInformation handleClosePropertyInfo={this.handleClosePropertyInfo}/>}
        {this.props.home.showSignIn && <SignIn handleCloseSignIn={this.handleCloseSignIn}/>}
        <Map/>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
      home: state
  };
};

export default withAuth(connect(mapStateToProps)(Home));
