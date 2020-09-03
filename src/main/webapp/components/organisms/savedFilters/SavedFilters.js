import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import SavedFiltersListItem from '../../molecules/savedFiltersListItem/SavedFiltersListItem';
import { filters } from '../../../../../../contsants_temp';
import {getNotifications, deleteNotification} from '../../../store/actions/notificationsAction';

const savedFilter = [{propertyZone: 'Zone1'}, {propertyZone: 'Zone1'}];

class SavedFilters extends Component {
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

  handleSelectFilter = (item) => {
    if(item!==undefined) {
    this.props.dispatch({type: 'FILTER', payload: {
      zone: item.propertyZone ? item.propertyZone : null,
      area: [item.propertyAreaMin ? item.propertyAreaMin : 0, item.propertyAreaMax ? item.propertyAreaMax : 20000],
      price: [item.propertyPriceMin ? item.propertyPriceMin : 100000, item.propertyPriceMax ? item.propertyPriceMax : 5000000],
      priceM2: [item.propertyPricePSMMin ? item.propertyPricePSMMin : 1, item.propertyPricePSMMax ? item.propertyPricePSMMax : 10000],
      postCode: item.propertyPostCode ? item.propertyPostCode : '',
      priceLandvalue: [item.propertyPriceToLandValueMin ? item.propertyPriceToLandValueMin : 0, item.propertyPriceToLandValueMax? item.propertyPriceToLandValueMax : 10 ],
      floorspaceRatio: [item.propertyFloorSpaceRatioMin ? item.propertyFloorSpaceRatioMin : 0, item.propertyFloorSpaceRatioMax ? item.propertyFloorSpaceRatioMax : 2]
    }})  
    this.props.handleSelectFilter(item)
                                              }
    this.props.dispatch({type: 'CLOSE_FILTER'})
  }
  handleEditFilter = (item) => {
    if (item!== undefined) {
    this.props.dispatch({type: 'FILTER', payload: {
      zone: item.propertyZone!== null ? item.propertyZone : null,
      area: [item.propertyAreaMin!== null? item.propertyAreaMin : 0, item.propertyAreaMax!== null ? item.propertyAreaMax : 20000],
      price: [item.propertyPriceMin!== null ? item.propertyPriceMin : 100000, item.propertyPriceMax!== null ? item.propertyPriceMax : 5000000],
      priceM2: [item.propertyPricePSMMin!== null ? item.propertyPricePSMMin : 1, item.propertyPricePSMMax!== null ? item.propertyPricePSMMax : 10000],
      postCode: item.propertyPostCode!== null ? item.propertyPostCode : '',
      priceLandvalue: [item.propertyPriceToLandValueMin!== null ? item.propertyPriceToLandValueMin : 0, item.propertyPriceToLandValueMax!== null ? item.propertyPriceToLandValueMax : 10 ],
      floorspaceRatio: [item.propertyFloorSpaceRatioMin!== null ? item.propertyFloorSpaceRatioMin : 0, item.propertyFloorSpaceRatioMax!== null ? item.propertyFloorSpaceRatioMax : 2]
    }})  
    this.props.handleEditFilter(item);
  }}


  handleDeleteFilter = async (item) => {
    this.props.deleteNotification(item, await this.props.auth.getAccessToken())
    this.props.getNotifications(await this.props.auth.getAccessToken())
  }

  renderData = () => {
    return this.props.notifications.map((item, index)=>{
      return <SavedFiltersListItem
              key={index}
              index={index+1}
              onEdit={(e)=>{this.handleEditFilter(item); e.stopPropagation()}}
              onDelete={(e)=>{this.handleDeleteFilter(item); e.stopPropagation()}}
              onSelect={(e)=>{this.handleSelectFilter(item); e.stopPropagation()}}
              data={{propertyZone: item.propertyZone, propertyAreaMin: item.propertyAreaMin, propertyAreaMax: item.propertyAreaMax,
                      propertyPriceMin: item.propertyPriceMin, propertyPriceMax: item.propertyPriceMax, propertyPricePSMMin: item.propertyPricePSMMin,
                      propertyPricePSMMax: item.propertyPricePSMMax, propertyPostCode: item.propertyPostCode, propertyPriceToLandValueMin: item.propertyPriceToLandValueMin,
                      propertyPriceToLandValueMax: item.propertyPriceToLandValueMax, propertyFloorSpaceRatioMin: item.propertyFloorSpaceRatioMin,
                      propertyFloorSpaceRatioMax: item.propertyFloorSpaceRatioMax}}
            />
    }
    );
  }

  async componentDidMount() {
    this.checkAuthentication();
    if (!this.state.authenticated) {
        this.props.getNotifications(await this.props.auth.getAccessToken())
        }
      }

  render() {
    return (
      <div>
        <ul className='savedFiltersList'>{this.renderData()}</ul>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    savedFilters: state,
    notifications: state.notifications
  };
};
const mapDispatchToProps = {
  getNotifications,
  deleteNotification
};

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(SavedFilters));
