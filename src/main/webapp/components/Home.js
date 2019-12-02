import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Map from './map/Map';
import { GiMagnifyingGlass} from 'react-icons/gi';
import FilterWidget from './widgets/FilterWidget';
import { connect } from 'react-redux';



class Home extends Component {

  constructor( props ) {
    super( props );
    this.state = { 
          authenticated: null,
          };
    this.checkAuthentication = this.checkAuthentication.bind( this );
    this.checkAuthentication();
  }
  
  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if ( authenticated !== this.state.authenticated ) {
      this.setState( { authenticated } );
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if ( this.state.authenticated === null ) return null;
  
    const button = this.state.authenticated ?
      <button className='loginButton' onClick={() => {this.props.auth.logout();}}>Logout</button> : 
      <button className='loginButton' onClick={() => {this.props.auth.login();}}>Login</button>;

    return (
      <div>
        {button}
        <button className='searchButton' onClick={()=>this.props.dispatch({type: 'SHOW_FILTER'})}>
          <GiMagnifyingGlass size='2em'/>
        </button>
        {this.props.filter.showFilter && <FilterWidget/>}
        <Map/>
      </div>
    );
  }

} 

const mapStateToProps = (state) => {
  return {
      filter: state
  };
};

export default withAuth(connect(mapStateToProps)(Home));
