import { withAuth } from "@okta/okta-react";
import React, { Component } from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { applyFilter, selectFilter } from "../../../store/actions/mapMarkerAction";
import CloseBtn from "../../atoms/closeBtn/CloseBtn";
import FilterTab from "../filter/FilterTab";
import SavedFilters from "../savedFilters/SavedFilters";
import "./filterModal.scss";
import { getFilter, saveFilter } from "../../../store/actions/filterAction";
import { closeFilter } from "../../../store/actions/filterModalAction";
import { showSignIn } from "../../../store/actions/signInModalAction";
import { getNotifications } from "../../../store/actions/notificationsAction";
import { showSaveModal } from "../../../store/actions/saveModalAction";

class FilterModal extends Component {

    constructor(props) {
      super(props);
      this.state = { 
        tabIndex: 0,
        authenticated: null,
        savedFilters: [],
        editedFilter: []
       // editedFilter: {"id":"f5e266e4-b729-4d72-8383-678faef08baf","createdAt":"2020-06-04T01:14:29.242+0000","updatedAt":"2020-09-08T09:38:31.943+0000","account":{"id":"9c867c05-e332-4a29-99ab-957b198f676f","createdAt":"2019-12-08T11:43:38.114+0000","updatedAt":"2020-09-10T20:01:57.991+0000","userId":"00u1ocauivq0h33sa357","firstName":null,"lastLogin":"2020-09-10T20:01:57.374+0000"},"title":"Untitled","frequency":"OFF","propertyZone":null,"propertyAreaMin":null,"propertyAreaMax":null,"propertyPriceMin":1630000,"propertyPriceMax":null,"propertyPricePSMMin":3650,"propertyPricePSMMax":6730,"propertyPostCode":null,"propertyPriceToLandValueMin":null,"propertyPriceToLandValueMax":null,"propertyFloorSpaceRatioMin":null,"propertyFloorSpaceRatioMax":null}
      };
    }

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    componentDidMount() {
      this.checkAuthentication();
    }

    handleSelectFilter = async (item) => {
      this.setState({ tabIndex : 0 });
      this.props.selectFilter(item, await this.props.auth.getAccessToken());
    }

    handleEditFilter = async (item) => {
      this.setState({ editedFilter: item, tabIndex : 0 });
    }

    handleSaveFilter = async () => { 
      if (this.state.authenticated == true) {
        this.props.getNotifications(await this.props.auth.getAccessToken());
        const result = this.props.notifications.find( filter => filter.id === this.state.editedFilter.id );
        if (result&&result.length!==0) {
            await this.props.saveFilter(await this.props.auth.getAccessToken(), this.state.editedFilter.name, this.state.editedFilter.frequency, this.state.editedFilter);
            this.setState({ tabIndex : 1 });
          } else {
            this.props.closeFilter();
            this.props.showSaveModal();
          }
      } else {
        this.props.showSignIn();
      }
  }

    handleSubmit = async () => {
      this.props.applyFilter(this.state.authenticated, await this.props.auth.getAccessToken());
    }

    render () {
        const { handleCloseFilter } = this.props;
        const { authenticated } = this.state;
      return (
          <div className='filterContainer'>
             <Fade>
              <div className='filterModal'>
                <div className='filterModalCloseBtn'>
                  <CloseBtn onClick={handleCloseFilter}/>
                  </div>
                  <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                    <TabList>
                      <Tab>Search Filters</Tab>
                      <Tab disabled={!authenticated}>Saved Filters</Tab>
                    </TabList>
                    <TabPanel>
                      <FilterTab handleSubmit={this.handleSubmit} handleSaveFilter={this.handleSaveFilter}/>
                    </TabPanel>
                    <TabPanel>
                      <SavedFilters handleSelectFilter={this.handleSelectFilter} handleEditFilter={this.handleEditFilter}/>
                    </TabPanel>
                  </Tabs>
              </div>
            </Fade>
          </div>
      );
   }
}

const mapStateToProps = (state) => {
  return {
    filter: state,
    notification: state.saveModal,
    notifications: state.notifications
  };
};

const mapDispatchToProps = {
  showSaveModal,
  applyFilter,
  getFilter,
  saveFilter,
  closeFilter,
  selectFilter,
  showSignIn,
  getNotifications
};

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(FilterModal));