import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Map from './map/Map';
import { GiMagnifyingGlass} from 'react-icons/gi';
import FilterWidget from './widgets/FilterWidget';
import { connect } from 'react-redux';


class Home extends Component {
  
    handleAuthenticated = () => {
      this.props.dispatch({type: 'AUTHENTICATED'})
    };

    handleNotAuthenticated = () => {
      this.props.dispatch({type: 'NOT_AUTHENTICATED'})
    };

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
    
      authenticated ? this.handleAuthenticated() : this.handleNotAuthenticated();
    }

  componentDidMount() {
    this.checkAuthentication();
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }
  
  render() {
    if ( this.props.home.authentication === null ) return null;
  
    const button = this.props.home.authentication ?
      <button className='loginButton' onClick={() => {this.props.auth.logout();}}>Logout</button> : 
      <button className='loginButton' onClick={() => {this.props.auth.login();}}>Login</button>;

    return (
      <div>
        {button}
        <button className='searchButton' onClick={()=>this.props.dispatch({type: 'SHOW_FILTER'})}>
          <GiMagnifyingGlass size='2em'/>
        </button>
        {this.props.home.showFilter && <FilterWidget/>}
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
