import {changeMarker, changeAllMarkers} from "./mapMarkerAction";
import { showLoading, hideLoading } from "./loadingAction";
const apiUrl = "/api/listing";

export const getPropertyInfo = (mapMarker) => async dispatch => {
    dispatch(showLoading());
    dispatch(setPropertyInfoRequest());
    fetch(`${apiUrl}/${mapMarker.id}`)
        .then(response => response.json())
        .then(res=>dispatch({type: "SET_PROPERTY_INFO_LOADED", markers: res}))
        .catch(error => console.log(error));
    dispatch(changeAllMarkers(mapMarker, "marker-unvisited"));
    dispatch(changeMarker(mapMarker, "marker-selected"));
    dispatch(hideLoading());
};

export const setPropertyInfoRequest = () => dispatch => {
    dispatch({
      type: "SET_PROPERTY_INFO_REQUEST"
    });
  };

export const setPropertyInfoLoaded = (property) => dispatch => {
  dispatch({
    type: "SET_PROPERTY_INFO_LOADED",
    property
  });
};

export const showProperty = (item) => {
    return {
        type: "SHOW_PROPERTY_INFO",
        payload: item
    };
};

export const closeProperty = () => {
    return {
        type: "HIDE_PROPERTY_INFO"
    };
};
