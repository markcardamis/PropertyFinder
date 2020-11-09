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
import { getNotifications } from "../../../store/actions/notificationsAction/getNotificationsAction";
import { showSaveModal } from "../../../store/actions/saveModalAction";
import WatchList from "./watchList/WatchList";

class FilterModal extends Component {

    constructor(props) {
      super(props);
      this.state = { 
        tabIndex: 0,
        authenticated: null,
        savedFilters: [],
        editedFilter: []
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
            await this.props.saveFilter(await this.props.auth.getAccessToken(), this.state.editedFilter.title, this.state.editedFilter.frequency, this.state.editedFilter);
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
                      <Tab disabled={!authenticated}>Watch List</Tab>
                    </TabList>
                    <TabPanel>
                      <FilterTab handleSubmit={this.handleSubmit} handleSaveFilter={this.handleSaveFilter}/>
                    </TabPanel>
                    <TabPanel>
                      <SavedFilters handleSelectFilter={this.handleSelectFilter} handleEditFilter={this.handleEditFilter}/>
                    </TabPanel>
                    <TabPanel>
                      <WatchList />
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