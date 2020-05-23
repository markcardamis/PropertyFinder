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
    this.props.dispatch({type: 'SHOW_LOADING'})
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
    this.props.dispatch({type: 'HIDE_LOADING'})
  }

  handleSelectFilter = (item) => {
    if(item!==undefined) {
    this.props.dispatch({type: 'FILTER', payload: {
                                                  zone: item.propertyZone ? item.propertyZone : null,
                                                  area: [item.propertyAreaMin? item.propertyAreaMin : 0, item.propertyAreaMax ? item.propertyAreaMax : 20000],
                                                  price: [item.propertyPriceMin ? item.propertyPriceMin : 100000, item.propertyPriceMax ? item.propertyPriceMax : 5000000],
                                                  priceM2: [item.propertyPSMMin ? item.propertyPSMMin : 1, item.propertyPSMMax ? item.propertyPSMMax : 10000],
                                                  postCode: item.propertyPostCode ? item.propertyPostCode : '',
                                                  priceLandvalue: [item.propertyPriceToLandValueMin ? item.propertyPriceToLandValueMin : 0, item.propertyPriceToLandValueMax ? item.propertyPriceToLandValueMax : 10 ],
                                                  floorspaceRatio: [item.propertyFloorSpaceRatioMin ? item.propertyFloorSpaceRatioMin : 0.1, item.propertyFloorSpaceRatioMax ? item.propertyFloorSpaceRatioMax : 2]
                                                }})  
    this.props.handleSelectFilter(item)
                                              }
  }
  handleEditFilter = (item) => {
    if (item!== undefined) {
    this.props.dispatch({type: 'FILTER', payload: {
                                                  zone: item.propertyZone ? item.propertyZone : null,
                                                  area: [item.propertyAreaMin? item.propertyAreaMin : 0, item.propertyAreaMax ? item.propertyAreaMax : 20000],
                                                  price: [item.propertyPriceMin ? item.propertyPriceMin : 100000, item.propertyPriceMax ? item.propertyPriceMax : 5000000],
                                                  priceM2: [item.propertyPSMMin ? item.propertyPSMMin : 1, item.propertyPSMMax ? item.propertyPSMMax : 10000],
                                                  postCode: item.propertyPostCode ? item.propertyPostCode : '',
                                                  priceLandvalue: [item.propertyPriceToLandValueMin ? item.propertyPriceToLandValueMin : 0, item.propertyPriceToLandValueMax ? item.propertyPriceToLandValueMax : 10 ],
                                                  floorspaceRatio: [item.propertyFloorSpaceRatioMin ? item.propertyFloorSpaceRatioMin : 0, item.propertyFloorSpaceRatioMax ? item.propertyFloorSpaceRatioMax : 2]
                                                }})  
    this.props.handleEditFilter(item)
  }
  }


  handleDeleteFilter = async (item) => {
    this.props.dispatch({type: 'SHOW_LOADING'})
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
    this.props.dispatch({type: 'HIDE_LOADING'})
    this.listSavedFilters();
  }

  renderData = () => {

    return this.state.savedFilters.map((item)=>
    //return savedFilter.map((item)=>
      <li key={item.id} className='filterItem'>
          <div className='filterHeader' style={{display: 'flex'}}>
            <h5 onClick={()=>this.handleSelectFilter(item)}>Filter {this.state.savedFilters.indexOf(item)+1}</h5>
            <div>
              <TiPencil className='filterItemIcon' size='1.3em' onClick={()=>this.handleEditFilter(item)}/>
              <TiTrash className='filterItemIcon' size='1.3em' onClick={()=>this.handleDeleteFilter(item)}/>
            </div>
          </div>
          <ul onClick={()=>this.handleSelectFilter(item)} style={{fontSize: '12px', listStyle: 'none'}}>
            <li className='listLine green'>{item.propertyZone ? `Zone: ${item.propertyZone}` : null}</li>
            <li className='listLine yellow'>{item.propertyAreaMin ? `Area min: ${item.propertyAreaMin}` : null}</li>
            <li className='listLine red'>{item.propertyAreaMax ? `Area max: ${item.propertyAreaMax}` : null}</li>
            <li className='listLine purple'>{item.propertyPriceMin ? `Price min: ${item.propertyPriceMin}` : null}</li>
            <li className='listLine orange'>{item.propertyPriceMax ? `Price max: ${item.propertyPriceMax}` : null}</li>
            <li className='listLine brown'>{item.propertyPSMMin ? `Price per m2 min: ${item.propertyPSMMin}` : null}</li>
            <li className='listLine blue'>{item.propertyPSMMax ? `Price per m2 max: ${item.propertyPSMMax}` : null}</li>  
            <li className='listLine orange2'>{item.propertyPostCode ? `Post code: ${item.propertyPostCode}` : null}</li>
            <li className='listLine pink'>{item.propertyPriceToLandValueMin ? `Price to landvalue min: ${item.propertyPriceToLandValueMin}` : null}</li>
            <li className='listLine purple2'>{item.propertyPriceToLandValueMax ? `Price to landvalue max: ${item.propertyPriceToLandValueMax}` : null}</li> 
            <li className='listLine green2'>{item.propertyFloorSpaceRatioMin ? `Floorspace ratio min: ${item.propertyFloorSpaceRatioMin}` : null}</li> 
            <li className='listLine blue2'>{item.propertyFloorSpaceRatioMax ? `Floorspace ratio max: ${item.propertyFloorSpaceRatioMax}` : null}</li> 
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
