import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { TiPencil, TiTrash } from 'react-icons/ti';
import { connect } from 'react-redux';


const savedFilter = [{propertyZone: 'Zone1'}, {propertyZone: 'Zone1'}]

class SavedFiltersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      savedFilters: []
    };
  }

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }
      
  listSavedFilters = async () => {
    try {
      const response = await fetch('/api/notifications', {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });

      const data = await response.json();
      this.setState({ savedFilters : data });
    } catch (err) {
      // add notification
    }
  }


  handleDeleteFilter = async (item) => {
    try {
      const response = await fetch(`/api/notifications/${item.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });
      const data = await response.json();
    } catch (err) {
      // add notification
    }
    this.listSavedFilters();
  }

  renderData = () => {
    return this.state.savedFilters.map((item)=>
      <li key={item.id} className='filterItem'>
          <div className='filterHeader' style={{display: 'flex'}}>
            <h5 onClick={()=>this.props.handleSelectFilter(item)}>Filter {this.state.savedFilters.indexOf(item)+1}</h5>
            <div>
              <TiPencil className='filterItemIcon' size='1.3em' onClick={()=>this.props.handleEditFilter(item)}/>
              <TiTrash className='filterItemIcon' size='1.3em' onClick={()=>this.handleDeleteFilter(item)}/>
            </div>
          </div>
          <ul onClick={()=>this.props.handleSelectFilter(item)} style={{fontSize: '12px', listStyle: 'none'}}>
            <li class='listLine green'>{item.propertyZone ? `Zone: ${item.propertyZone}` : null}</li>
            <li class='listLine yellow'>{item.propertyAreaMin ? `Area min: ${item.propertyAreaMin}` : null}</li>
            <li class='listLine red'>{item.propertyAreaMax ? `Area max: ${item.propertyAreaMax}` : null}</li>
            <li class='listLine purple'>{item.propertyPriceMin ? `Price min: ${item.propertyPriceMin}` : null}</li>
            <li class='listLine orange'>{item.propertyPriceMax ? `Price max: ${item.propertyPriceMax}` : null}</li>
            <li class='listLine brown'>{item.propertyPSMMin ? `Price per m2 min: ${item.propertyPSMMin}` : null}</li>
            <li class='listLine blue'>{item.propertyPSMMax ? `Price per m2 max: ${item.propertyPSMMax}` : null}</li>  
            <li class='listLine orange2'>{item.propertyPostCode ? `Post code: ${item.propertyPostCode}` : null}</li>
            <li class='listLine pink'>{item.propertyPriceToLandValueMin ? `Price to landvalue min: ${item.propertyPriceToLandValueMin}` : null}</li>
            <li class='listLine purple2'>{item.propertyPriceToLandValueMax ? `Price to landvalue max: ${item.propertyPriceToLandValueMax}` : null}</li> 
            <li class='listLine green2'>{item.propertyFloorSpaceRatioMin ? `Floorspace ratio min: ${item.propertyFloorSpaceRatioMin}` : null}</li> 
            <li class='listLine blue2'>{item.propertyFloorSpaceRatioMax ? `Floorspace ratio max: ${item.propertyFloorSpaceRatioMax}` : null}</li> 
          </ul>
      </li>
    );
  }

  componentDidMount() {
    this.checkAuthentication();
    if (!this.state.authenticated) {
        this.listSavedFilters();
        }
      }

  render() {
    return (
      <div>
        <ul className='savedFiltersList col-lg-12'>{this.renderData()}</ul>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    savedFilters: state
  };
};

export default withAuth(connect(mapStateToProps)(SavedFiltersTab));
