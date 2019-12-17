import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { TiPencil, TiTrash } from 'react-icons/ti';
import { connect } from 'react-redux';
import { displayFilterParameters } from '../../shared/methods/displayFilterParameters';
import { listSavedFilters } from '../../shared/api/api'

class SavedFilters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticted: null,
            savedFilters: []
        };
      }

   checkAuthentication =  async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
        }
    }
      
  // async listSavedFilters () {
  //   try {
  //       const response = await fetch('/api/notifications', {
  //         headers: {
  //             Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
  //         }
  //     });
  //     const data = await response.json();
  //     console.dir({ data });
  //     console.log('successfully loaded list of filters');

  //     //   this.setState({ notifications : JSON.stringify(data) });
  //     this.setState({ savedFilters : data });
  //   } catch (err) {
  //       console.log('error loading list of filters');
  //   }
  // }

  async handleSelectFilter (item) {
      console.log('select filter works')
      try {
        const response = await fetch(`/api/listing/notifications/${item.id}`, {
            headers: {
              Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
            }
            });
        const data = await response.json();
        displayFilterParameters(data);
      } catch (err) {
          console.log('error loading list of filters');
        };
    }

  async handleDeleteFilter (item) {
      try {
          const response = await fetch(`/api/notifications/${item.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
            }
          });
          const data = await response.json();
          console.dir({ data });
    
          //   this.setState({ notifications : JSON.stringify(data) });
          // this.setState({ savedFilters : data });
      } catch (err) {
          console.log('error delete filter');
      }
      listSavedFilters();
    }

  renderData = () => {
      return this.state.savedFilters.map((item)=>
            <li key={item.id} className='filterItem d-flex justify-content-between'>
                <div>
                  <div style={{display: 'flex'}}>
                    <h5 onClick={this.handleSelectFilter.bind(this, item)}>Filter {this.state.notifications.indexOf(item)+1}</h5>
                    <TiPencil className='filterItemIcon' size='1.3em' onClick={()=>this.props.onClick(item)}/>
                    <TiTrash className='filterItemIcon' size='1.3em' onClick={this.handleDeleteFilter.bind(this, item)}/>
                  </div>
                    <ul onClick={this.handleSelectFilter.bind(this, item)} style={{fontSize: '12px', listStyle: 'none'}}>
                        <li>{item.propertyZone ? `Zone: ${item.propertyZone}` : null}</li>
                        <li>{item.propertyAreaMin ? `Area min: ${item.propertyAreaMin}` : null}</li>
                        <li>{item.propertyAreaMax ? `Area max: ${item.propertyAreaMax}` : null}</li>
                        <li>{item.propertyPriceMin ? `Price min: ${item.propertyPriceMin}` : null}</li>
                        <li>{item.propertyPriceMax ? `Price max: ${item.propertyPriceMax}` : null}</li>
                        <li>{item.propertyPSMMin ? `Price per m2 min: ${item.propertyPSMMin}` : null}</li>
                        <li>{item.propertyPSMMax ? `Price per m2 max: ${item.propertyPSMMax}` : null}</li>  
                        <li>{item.propertyPostCode ? `Post code: ${item.propertyPostCode}` : null}</li>
                        <li>{item.propertyPriceToLandValueMin ? `Price to landvalue min: ${item.propertyPriceToLandValueMin}` : null}</li>
                        <li>{item.propertyPriceToLandValueMax ? `Price to landvalue max: ${item.propertyPriceToLandValueMax}` : null}</li> 
                        <li>{item.propertyFloorSpaceRatioMin ? `Floorspace ratio min: ${item.propertyFloorSpaceRatioMin}` : null}</li> 
                        <li>{item.propertyFloorSpaceRatioMax ? `Floorspace ratio max: ${item.propertyFloorSpaceRatioMax}` : null}</li> 
                    </ul>
                </div>
            </li>
      );
  }

  componentDidMount() {
    this.checkAuthentication();
    listSavedFilters();
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

export default withAuth(connect(mapStateToProps)(SavedFilters));
