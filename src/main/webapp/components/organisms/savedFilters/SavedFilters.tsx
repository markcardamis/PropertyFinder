import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SavedFiltersListItem from "../../molecules/savedFiltersListItem/SavedFiltersListItem";
import { getNotifications } from "../../../store/actions/notificationsAction/getNotificationsAction";
import { deleteNotification } from "../../../store/actions/notificationsAction/deleteNotificationAction";
import { getFilter, saveFilter } from "../../../store/actions/filterAction";
import { closeFilter } from "../../../store/actions/filterModalAction";
import { FREQUENCY } from "../../../shared/constants/constants";
import { useAuth } from "../../../hooks/useAuth";

export interface SavedFiltersProps {
  onSelectFilter: (item) => void;
  onEditFilter: (item) => void;
}

const SavedFilters = ({ onSelectFilter, onEditFilter }:SavedFiltersProps) => {
  const dispatch = useDispatch();
  const { notifications, filter } = useSelector((state) => state);
  const { isAuthenticated, accessToken } = useAuth();

  const handleSelectFilter = (item) => {
    if (item !== undefined) {
      dispatch(
        getFilter({
          zone: item.propertyZone ? item.propertyZone : null,
          area: [
            item.propertyAreaMin ? item.propertyAreaMin : 0,
            item.propertyAreaMax ? item.propertyAreaMax : 20000,
          ],
          streetFrontage: [
            item.streetFrontageMin ? item.streetFrontageMin : 0,
            item.streetFrontageMax ? item.streetFrontageMax : 20,
          ],
          price: [
            item.propertyPriceMin ? item.propertyPriceMin : 100000,
            item.propertyPriceMax ? item.propertyPriceMax : 5000000,
          ],
          priceM2: [
            item.propertyPricePSMMin ? item.propertyPricePSMMin : 1,
            item.propertyPricePSMMax ? item.propertyPricePSMMax : 10000,
          ],
          postCode: item.propertyPostCode ? item.propertyPostCode : "",
          priceLandvalue: [
            item.propertyPriceToLandValueMin
              ? item.propertyPriceToLandValueMin
              : 0,
            item.propertyPriceToLandValueMax
              ? item.propertyPriceToLandValueMax
              : 10,
          ],
          floorspaceRatio: [
            item.propertyFloorSpaceRatioMin
              ? item.propertyFloorSpaceRatioMin
              : 0,
            item.propertyFloorSpaceRatioMax
              ? item.propertyFloorSpaceRatioMax
              : 2,
          ],
          landOnly: item.landOnly,
        })
      );
      onSelectFilter(item);
    }
    dispatch(closeFilter());
  };
  const handleEditFilter = (item) => {
    if (item !== undefined) {
      dispatch(
        getFilter({
          zone: item.propertyZone !== null ? item.propertyZone : null,
          area: [
            item.propertyAreaMin !== null ? item.propertyAreaMin : 0,
            item.propertyAreaMax !== null ? item.propertyAreaMax : 20000,
          ],
          streetFrontage: [
            item.streetFrontageMin ? item.streetFrontageMin : 0,
            item.streetFrontageMax ? item.streetFrontageMax : 50,
          ],
          price: [
            item.propertyPriceMin !== null ? item.propertyPriceMin : 100000,
            item.propertyPriceMax !== null ? item.propertyPriceMax : 5000000,
          ],
          priceM2: [
            item.propertyPricePSMMin !== null ? item.propertyPricePSMMin : 1,
            item.propertyPricePSMMax !== null
              ? item.propertyPricePSMMax
              : 10000,
          ],
          postCode: item.propertyPostCode !== null ? item.propertyPostCode : "",
          priceLandvalue: [
            item.propertyPriceToLandValueMin !== null
              ? item.propertyPriceToLandValueMin
              : 0,
            item.propertyPriceToLandValueMax !== null
              ? item.propertyPriceToLandValueMax
              : 10,
          ],
          floorspaceRatio: [
            item.propertyFloorSpaceRatioMin !== null
              ? item.propertyFloorSpaceRatioMin
              : 0,
            item.propertyFloorSpaceRatioMax !== null
              ? item.propertyFloorSpaceRatioMax
              : 2,
          ],
          landOnly: item.landOnly,
        })
      );
      onEditFilter(item);
    }
  };
  const handleChangeFrequency = async (item) => {
    const getFrequency = () => {
      const startFrequency =
        item.frequency == null || !item.frequency ? "OFF" : item.frequency;
      const index =
        FREQUENCY.indexOf(startFrequency) < 3
          ? FREQUENCY.indexOf(startFrequency) + 1
          : 0;
      return FREQUENCY[index];
    };
    await dispatch(
      getFilter({
        frequency: getFrequency(),
        zone: item.propertyZone ? item.propertyZone : null,
        area: [
          item.propertyAreaMin !== 0 ? item.propertyAreaMin : 0,
          item.propertyAreaMax !== 20000 ? item.propertyAreaMax : 20000,
        ],
        streetFrontage: [
          item.streetFrontageMin ? item.streetFrontageMin : 0,
          item.streetFrontageMax ? item.streetFrontageMax : 20,
        ],
        price: [
          item.propertyPriceMin !== 100000 ? item.propertyPriceMin : 100000,
          item.propertyPriceMax !== 5000000 ? item.propertyPriceMax : 5000000,
        ],
        priceM2: [
          item.propertyPricePSMMin !== 1 ? item.propertyPricePSMMin : 1,
          item.propertyPricePSMMax !== 10000 ? item.propertyPricePSMMax : 10000,
        ],
        postCode: item.propertyPostCode !== "" ? item.propertyPostCode : "",
        priceLandvalue: [
          item.propertyPriceToLandValueMin !== 0
            ? item.propertyPriceToLandValueMin
            : 0,
          item.propertyPriceToLandValueMax !== 10
            ? item.propertyPriceToLandValueMax
            : 10,
        ],
        floorspaceRatio: [
          item.propertyFloorSpaceRatioMin !== 0
            ? item.propertyFloorSpaceRatioMin
            : 0,
          item.propertyFloorSpaceRatioMax !== 2
            ? item.propertyFloorSpaceRatioMax
            : 2,
        ],
        landOnly: item.landOnly,
      })
    );
    await dispatch(
      saveFilter(accessToken, item.title, getFrequency(), {
        ...filter,
        id: item.id,
      })
    );
    dispatch(getNotifications(accessToken));
  };

  const handleDeleteFilter = async (item) => {
    await dispatch(deleteNotification(item, accessToken));
    dispatch(getNotifications(accessToken));
  };

  const renderData = () => {
    return notifications.map((item, index) => {
      return (
        <SavedFiltersListItem
          key={index}
          index={index + 1}
          onEdit={(e) => {
            handleEditFilter(item);
            e.stopPropagation();
          }}
          onChangeFrequency={(e) => {
            handleChangeFrequency(item);
            e.stopPropagation();
          }}
          onDelete={(e) => {
            handleDeleteFilter(item);
            e.stopPropagation();
          }}
          onSelect={(e) => {
            handleSelectFilter(item);
            e.stopPropagation();
          }}
          data={item}
        />
      );
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotifications(accessToken));
    }
  }, [isAuthenticated]);

  return (
    <div>
      <ul className="savedFiltersList">{renderData()}</ul>
    </div>
  );
};

export default SavedFilters;
