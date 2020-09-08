import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Popup from "../../components/organisms/popup/Popup";
import {store} from "../../../webapp/javascript/index";
import {map} from "../../components/organisms/map/MapGL";
import { showLoading, hideLoading } from "./loadingAction";

const apiUrl = "/api/propertyinformation";

const renderPopup = (longitude, latitude) => {
  
  const property = store.getState().popup;
  const {base_date_1, base_date_2, base_date_3, base_date_4, base_date_5, base_date_0, land_value_1, land_value_2, land_value_3, land_value_4, land_value_5, land_value_0, property_sales} = property;
  const chartData={
      baseDate: [base_date_5, base_date_4, base_date_3, base_date_2, base_date_1, base_date_0],
      landValue: [land_value_5, land_value_4, land_value_3, land_value_2, land_value_1, land_value_0]
  };
  
  const popup = <Popup chartData={chartData} salesData={property_sales} propertyInfo={property}/>;
  const propertyData = <div>{popup}</div>;
  
  const addPopup=(el) =>{
      const placeholder = document.createElement("div");
      ReactDOM.render(el, placeholder);
  
      const marker = new mapboxgl.Popup()
          .setDOMContent(placeholder)
          .setLngLat([longitude, latitude])
          .setMaxWidth("100%")
          .addTo(map);
  };
  addPopup(propertyData);
};

export const getPopup = (propId, longitude, latitude) => async dispatch => {
    // dispatch(showLoading());
    dispatch(setPopupRequest());
    await fetch(`${apiUrl}/${propId}`)
        .then(response => response.json())
        .then(res=>dispatch({type: "SET_POPUP_LOADED", property: res}))
        .catch(error => console.log(error));
    renderPopup(longitude, latitude);
    // dispatch(hideLoading());
};

export const setPopupRequest = () => dispatch => {
    dispatch({
      type: "SET_POPUP_REQUEST"
    });
  };

export const setPopupLoaded = (property) => dispatch => {
  dispatch({
    type: "SET_POPUP_LOADED",
    property
  });
};

export const closePopup = () => {
    return {
        type: "HIDE_POPUP"
    };
};
