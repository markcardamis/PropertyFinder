import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import "react-tabs/style/react-tabs.css";
import {
  applyFilter,
  selectFilter,
} from "../../../store/actions/mapMarkerAction";
import CloseBtn from "../../atoms/closeBtn/CloseBtn";
import FilterTab from "../filter/FilterTab";
import SavedFilters from "../savedFilters/SavedFilters";
import "./filterModal.scss";
import { saveFilter } from "../../../store/actions/filterAction";
import { closeFilter } from "../../../store/actions/filterModalAction";
import { showSignIn } from "../../../store/actions/signInModalAction";
import { getNotifications } from "../../../store/actions/notificationsAction/getNotificationsAction";
import { showSaveModal } from "../../../store/actions/saveModalAction";
import WatchList from "../watchList/WatchList";
import ParcelSearch from "../parcelSearch/ParcelSearch";
import { useAuth } from "../../../hooks/useAuth";

export interface FilterModalProps {
  handleCloseFilter: () => void;
}

const FilterModal = ({ handleCloseFilter }: FilterModalProps) => {
  const dispatch = useDispatch();
  const { isAuthenticated, accessToken } = useAuth();
  const { notifications } = useSelector((state) => state);

  const [tabIndex, setTabIndex] = useState(0);
  const [editedFilter, setEditedFilter] = useState([]);

  const handleSelectFilter = async (item) => {
    setTabIndex(0);
    dispatch(selectFilter(item, accessToken));
  };

  const handleEditFilter = async (item) => {
    setEditedFilter(item);
    setTabIndex(0);
  };

  const handleSaveFilter = async () => {
    if (isAuthenticated) {
      dispatch(getNotifications(accessToken));
      const result = notifications.find(
        (filter) => filter.id === editedFilter.id
      );
      if (result && result.length !== 0) {
        await dispatch(
          saveFilter(
            accessToken,
            editedFilter.title,
            editedFilter.frequency,
            editedFilter
          )
        );
        setTabIndex(2);
      } else {
        dispatch(closeFilter());
        dispatch(showSaveModal());
      }
    } else {
      dispatch(showSignIn());
    }
  };

  const handleSubmit = () => {
    dispatch(applyFilter(isAuthenticated, accessToken));
  };

  return (
    <div className="filterContainer">
      <Fade>
        <div className="filterModal">
          <div className="filterModalCloseBtn">
            <CloseBtn onClick={handleCloseFilter} />
          </div>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(tabIndex) => setTabIndex(tabIndex)}
          >
            <TabList>
              <Tab>Listing Search</Tab>
              <Tab>Parcel Finder</Tab>
              <Tab disabled={!isAuthenticated}>Saved Searches</Tab>
              <Tab disabled={!isAuthenticated}>Parcel Watchlist</Tab>
            </TabList>
            <TabPanel>
              <FilterTab
                handleSubmit={handleSubmit}
                handleSaveFilter={handleSaveFilter}
              />
            </TabPanel>
            <TabPanel>
              <ParcelSearch handleSubmit={handleSubmit} />
            </TabPanel>
            <TabPanel>
              <SavedFilters
                handleSelectFilter={handleSelectFilter}
                handleEditFilter={handleEditFilter}
              />
            </TabPanel>
            <TabPanel>
              <WatchList />
            </TabPanel>
          </Tabs>
        </div>
      </Fade>
    </div>
  );
};

export default FilterModal;
