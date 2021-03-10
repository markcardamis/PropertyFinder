import React, { Component } from "react";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import SavedFiltersListItem from "../../molecules/savedFiltersListItem/SavedFiltersListItem";
import { getNotifications } from "../../../store/actions/notificationsAction/getNotificationsAction";
import { deleteNotification } from "../../../store/actions/notificationsAction/deleteNotificationAction";
import { getFilter, saveFilter } from "../../../store/actions/filterAction";
import { closeFilter } from "../../../store/actions/filterModalAction";
import { FREQUENCY } from "../../../shared/constants/constants";
import { getWatchList } from "../../../store/actions/watchListAction/getWatchListAction";

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
    if (item!==undefined) {
      this.props.getFilter({
        zone: item.propertyZone ? item.propertyZone : null,
        area: [ item.propertyAreaMin ? item.propertyAreaMin : 0, item.propertyAreaMax ? item.propertyAreaMax : 20000 ],
        streetFrontage: [ item.streetFrontageMin ? item.streetFrontageMin : 0, item.streetFrontageMax ? item.streetFrontageMax : 20 ],
        price: [ item.propertyPriceMin ? item.propertyPriceMin : 100000, item.propertyPriceMax ? item.propertyPriceMax : 5000000 ],
        priceM2: [ item.propertyPricePSMMin ? item.propertyPricePSMMin : 1, item.propertyPricePSMMax ? item.propertyPricePSMMax : 10000 ],
        postCode: item.propertyPostCode ? item.propertyPostCode : "",
        priceLandvalue: [ item.propertyPriceToLandValueMin ? item.propertyPriceToLandValueMin : 0, item.propertyPriceToLandValueMax? item.propertyPriceToLandValueMax : 10 ],
        floorspaceRatio: [ item.propertyFloorSpaceRatioMin ? item.propertyFloorSpaceRatioMin : 0, item.propertyFloorSpaceRatioMax ? item.propertyFloorSpaceRatioMax : 2 ],
        landOnly: item.landOnly
      });  
      this.props.handleSelectFilter(item);
    }
    this.props.closeFilter();
  }
  handleEditFilter = (item) => {
    if (item!== undefined) {
    this.props.getFilter({
      zone: item.propertyZone!== null ? item.propertyZone : null,
      area: [ item.propertyAreaMin!== null? item.propertyAreaMin : 0, item.propertyAreaMax!== null ? item.propertyAreaMax : 20000 ],
      streetFrontage: [ item.streetFrontageMin ? item.streetFrontageMin : 0, item.streetFrontageMax ? item.streetFrontageMax : 50 ],
      price: [ item.propertyPriceMin!== null ? item.propertyPriceMin : 100000, item.propertyPriceMax!== null ? item.propertyPriceMax : 5000000 ],
      priceM2: [ item.propertyPricePSMMin!== null ? item.propertyPricePSMMin : 1, item.propertyPricePSMMax!== null ? item.propertyPricePSMMax : 10000 ],
      postCode: item.propertyPostCode!== null ? item.propertyPostCode : "",
      priceLandvalue: [ item.propertyPriceToLandValueMin!== null ? item.propertyPriceToLandValueMin : 0, item.propertyPriceToLandValueMax!== null ? item.propertyPriceToLandValueMax : 10 ],
      floorspaceRatio: [ item.propertyFloorSpaceRatioMin!== null ? item.propertyFloorSpaceRatioMin : 0, item.propertyFloorSpaceRatioMax!== null ? item.propertyFloorSpaceRatioMax : 2 ],
      landOnly: item.landOnly,
    });  
    this.props.handleEditFilter(item);
  }}
  handleChangeFrequency = async (item) => {
    const getFrequency = () => {
      const startFrequency = item.frequency==null || !item.frequency ? "OFF" : item.frequency;
      const index = FREQUENCY.indexOf(startFrequency)<3 ? FREQUENCY.indexOf(startFrequency) + 1 : 0;
      return FREQUENCY[index];
    };
    await this.props.getFilter({ 
        frequency: getFrequency(),
        zone: item.propertyZone ? item.propertyZone : null,
        area: [ item.propertyAreaMin !== 0 ? item.propertyAreaMin : 0, item.propertyAreaMax !== 20000 ? item.propertyAreaMax : 20000 ],
        streetFrontage: [ item.streetFrontageMin ? item.streetFrontageMin : 0, item.streetFrontageMax ? item.streetFrontageMax : 20 ],
        price: [ item.propertyPriceMin !== 100000 ? item.propertyPriceMin : 100000, item.propertyPriceMax !== 5000000 ? item.propertyPriceMax : 5000000 ],
        priceM2: [ item.propertyPricePSMMin !== 1 ? item.propertyPricePSMMin : 1, item.propertyPricePSMMax !== 10000 ? item.propertyPricePSMMax : 10000 ],
        postCode: item.propertyPostCode !== "" ? item.propertyPostCode : "",
        priceLandvalue: [ item.propertyPriceToLandValueMin !== 0 ? item.propertyPriceToLandValueMin : 0, item.propertyPriceToLandValueMax !== 10 ? item.propertyPriceToLandValueMax : 10 ],
        floorspaceRatio: [ item.propertyFloorSpaceRatioMin !== 0 ? item.propertyFloorSpaceRatioMin : 0, item.propertyFloorSpaceRatioMax !== 2 ? item.propertyFloorSpaceRatioMax : 2 ],
        landOnly: item.landOnly,
        });
    // this.props.saveFilter(await this.props.auth.getAccessToken(), item.title, getFrequency(), item);
    await this.props.saveFilter(await this.props.auth.getAccessToken(), item.title, getFrequency(), { ...this.props.filter, id: item.id });
    this.props.getNotifications(await this.props.auth.getAccessToken());
  }

  handleDeleteFilter = async (item) => {
    await this.props.deleteNotification(item, await this.props.auth.getAccessToken());
    this.props.getNotifications(await this.props.auth.getAccessToken());
  }

  renderData = () => {
    return this.props.notifications.map((item, index)=>{
      return <SavedFiltersListItem
              key={index}
              index={index+1}
              onEdit={(e)=>{this.handleEditFilter(item); e.stopPropagation();}}
              onChangeFrequency={(e)=>{this.handleChangeFrequency(item); e.stopPropagation();}}
              onDelete={(e)=>{this.handleDeleteFilter(item); e.stopPropagation();}}
              onSelect={(e)=>{this.handleSelectFilter(item); e.stopPropagation();}}
              data={item}
            />;
    }
    );
  }

  async componentDidMount() {
    this.checkAuthentication();
    if (!this.state.authenticated) {
        this.props.getNotifications(await this.props.auth.getAccessToken());
        }
      }

  render() {
    return (
      <div>
        <ul className='savedFiltersList'>{this.renderData()}</ul>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    savedFilters: state,
    filter: state.filter,
    notifications: state.notifications
  };
};
const mapDispatchToProps = {
  getNotifications,
  deleteNotification,
  getFilter,
  closeFilter,
  saveFilter,
  getWatchList
};

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(SavedFilters));
