import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';

import PropertyInformation from './widgets/propertyInformation/PropertyInformation';
import Filter from './widgets/filter/Filter';
import SignIn from './widgets/SignIn';
import MapGL from './map/MapGL';
import FilterBtn from './buttons/filterBtn/FilterBtn';

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
        <FilterBtn onClick = {this.toggleFilter}/>
        {this.props.home.showFilter && <Filter handleCloseFilter={this.handleCloseFilter}/>}
        {this.props.home.showProperty.isHidden && <PropertyInformation handleClosePropertyInfo={this.handleClosePropertyInfo}/>}
        {this.props.home.showSignIn && <SignIn handleCloseSignIn={this.handleCloseSignIn}/>}
        <MapGL/>
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
