import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { TiPencil, TiTrash } from 'react-icons/ti';
import { change } from 'redux-form';
import { connect } from 'react-redux';

class SavedFilters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticted: null,
            notifications: []
        };
      }

   checkAuthentication =  async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
        }
    }
      
  async getFilterList () {
    try {
        const response = await fetch('/api/notifications', {
          headers: {
              Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
          }
      });
      const data = await response.json();
      console.dir({ data });
      console.log('successfully loaded list of filters');

      //   this.setState({ notifications : JSON.stringify(data) });
      this.setState({ notifications : data });
    } catch (err) {
        console.log('error loading list of filters');
    }
      }

  displayFilterParameters = (item) => {
      this.props.dispatch(change('filter', 'propertyZone', item.propertyZone));
      this.props.dispatch(change('filter', 'propertyAreaMin', item.propertyAreaMin));
      this.props.dispatch(change('filter', 'propertyAreaMax', item.propertyAreaMax));
      this.props.dispatch(change('filter', 'propertyPriceMin', item.propertyPriceMin));
      this.props.dispatch(change('filter', 'propertyPriceMax', item.propertyPriceMax));
      this.props.dispatch(change('filter', 'propertyPricePSMMin', item.propertyPricePSMMin));
      this.props.dispatch(change('filter', 'propertyPricePSMMax', item.propertyPricePSMMax));
      this.props.dispatch(change('filter', 'propertyPostCode', item.propertyPostCode));
      this.props.dispatch(change('filter', 'propertyPriceToLandValueMin', item.propertyPriceToLandValueMin));
      this.props.dispatch(change('filter', 'propertyPriceToLandValueMax', item.propertyPriceToLandValueMax));
      this.props.dispatch(change('filter', 'propertyFloorSpaceRatioMin', item.propertyFloorSpaceRatioMin));
      this.props.dispatch(change('filter', 'propertyFloorSpaceRatioMax', item.propertyPriceToLandValueMin));
  }

    handleSelectFilter = async (item) => {
        console.log('select filter works')
        try {
              const response = await fetch(`/api/listing/notifications/${item.id}`, {
                headers: {
                    Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
                }
            });
              const data = await response.json();
        this.displayFilterParameters(item);
            } catch (err) {
                console.log('error loading list of filters');
            };
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
        console.dir({ data });
  
        //   this.setState({ notifications : JSON.stringify(data) });
        this.setState({ notifications : data });
    } catch (err) {
        console.log('error delete filter');
    }
    this.getFilterList();
}

  renderData = () => {
      return this.state.notifications.map((item)=>
            <li key={item.id} className='filterItem d-flex justify-content-between'>
                <div>
                  <div style={{display: 'flex'}}>
                    <h5 onClick={this.handleDeleteFilter(item)}>Filter {this.state.notifications.indexOf(item)+1}</h5>
                    <TiPencil className='filterItemIcon' size='1.3em' onClick={()=>this.props.onClick(item)}/>
                    <TiTrash className='filterItemIcon' size='1.3em' onClick={this.handleDeleteFilter.bind(this, item)}/>
                  </div>
                    <ul onClick={this.handleDeleteFilter(item)} style={{fontSize: '12px', listStyle: 'none'}}>
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
    this.getFilterList();
  }

  // componentDidUpdate() {
  //   console.log('filter list updated')
  //   this.checkAuthentication();
  //   this.getFilterList();
  // }

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
