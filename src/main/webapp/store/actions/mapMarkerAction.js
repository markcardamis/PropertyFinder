import React from "react";
import { store } from "../../../webapp/javascript/index";
import MapMarker from "../../assets/icons/MapMarker";
import { hideLoading, showLoading } from "./loadingAction";
import {closeFilter } from "./filterModalAction";

const apiUrl = "/api/listing";

export const getMapMarkers = (renderMarkers) => async dispatch => {
    dispatch(showLoading());
    dispatch(setMapMarkersRequest());
    await fetch(apiUrl)
        .then(response => response.json())
        .then(res=>dispatch({type: "SET_MAP_MARKERS_LOADED", markers: res}))
        .catch(error => console.log(error));
    const mp = <div><MapMarker/></div>;
    renderMarkers(mp);
    dispatch(hideLoading());
};

export const setMapMarkersRequest = () => dispatch => {
    dispatch({
      type: "SET_MAP_MARKERS_REQUEST"
    });
  };

export const setMapMarkersLoaded = (markers) => dispatch => {
  dispatch({
    type: "SET_MAP_MARKERS_LOADED",
    markers
  });
};

export const changeMarker = (item, status) => {
    return {
        type: "CHANGE_MARKER_STATUS",
        payload: item,
        status
    };
};

export const changeAllMarkers = (item, status) => {
    return {
        type: "CHANGE_ALL_MARKERS_STATUS",
        payload: item,
        status
    };
};

export const applyFilter = (authenticated, accessToken) => async dispatch => {
  const {zone, area, price, priceM2, postCode, priceLandvalue, floorspaceRatio} = store.getState().filter;
  const {latitude, longitude} = store.getState().viewport;
  let headers = {
    "Content-Type": "application/json",
    "centreLatitude": latitude,
    "centreLongitude": longitude
  };
  headers = authenticated===false ? headers : { ...headers, "Authorization": "Bearer " + accessToken};

  const filter = {
      propertyZone: zone ? zone : null,
      propertyAreaMin: area[0] !== 0 ? area[0] : null,
      propertyAreaMax: area[1] !== 20000 ? area[1] : null,
      propertyPriceMin: price[0] !== 100000 ? price[0] : null,
      propertyPriceMax: price[1] !== 5000000 ? price[1] : null,
      propertyPricePSMMin: priceM2[0] !== 1 ? priceM2[0] : null,
      propertyPricePSMMax: priceM2[1] !== 10000 ? priceM2[1] : null,
      propertyPostCode: postCode !== "" ? postCode : null,
      propertyPriceToLandValueMin: priceLandvalue[0] !== 0 ? priceLandvalue[0] : null,
      propertyPriceToLandValueMax: priceLandvalue[1] !== 10 ? priceLandvalue[1] : null,
      propertyFloorSpaceRatioMin: floorspaceRatio[0] !== 0 ? floorspaceRatio[0] : null,
      propertyFloorSpaceRatioMax: floorspaceRatio[1] !== 2 ? floorspaceRatio[1] : null
  };
  dispatch(showLoading());
  dispatch(applyFilterRequest());
  await fetch(`${apiUrl}/query`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(filter)
  })
      .then(response => response.json())
      .then(res=>dispatch({type: "SET_MAP_MARKERS_LOADED", markers: res}))
      .catch(error => console.log(error));
  dispatch(hideLoading());
};

export const applyFilterRequest = () => dispatch => {
  dispatch({
    type: "APPLY_FILTER_REQUEST"
  });
};


export const selectFilter = (item, accessToken) => async dispatch => {
  dispatch(showLoading());
  dispatch(selectFilterRequest());
  await fetch(`${apiUrl}/notifications/${item.id}`, {
      headers: {
        "Authorization": "Bearer " + accessToken
        },
      })
      .then(response => response.json())
      .then(res=>dispatch({type: "SET_MAP_MARKERS_LOADED", markers: res}))
      .catch(error => console.log(error));
  dispatch(hideLoading());
  dispatch(closeFilter());
};

export const selectFilterRequest = () => dispatch => {
  dispatch({
    type: "SELECT_FILTER_REQUEST"
  });
};



