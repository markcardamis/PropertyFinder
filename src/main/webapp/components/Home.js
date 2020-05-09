import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';

import PropertyInformation from './widgets/propertyInformation/PropertyInformation';
import Filter from './widgets/filter/Filter';
import SignIn from './widgets/signin/SignIn';
import MapGL from './map/MapGL';
import FilterBtn from './buttons/filterBtn/FilterBtn';
import ButtonLogin from './atoms/buttonLogin/ButtonLogin';
import ButtonAccount from './atoms/buttonAccount/ButtonAccount';

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
    const { showFilter, showProperty, showSignIn } = this.props.home;
    if ( this.state.authenticated === null ) return null;
  
    const button = this.state.authenticated ?
      <ButtonAccount onClick={() => {this.props.auth.logout()}}/> :
      <ButtonLogin onClick={() => {this.props.auth.login()}}/>

    return (
      <div>
        <div style={{position: 'absolute', top: '10px', right: 15, zIndex: 2}}>{button}</div>
        <FilterBtn onClick = {this.toggleFilter}/>
        {showFilter && <Filter handleCloseFilter={this.handleCloseFilter}/>}
        {showProperty.isHidden && <PropertyInformation handleClosePropertyInfo={this.handleClosePropertyInfo}/>}
        {showSignIn && <SignIn handleCloseSignIn={this.handleCloseSignIn}/>}
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
