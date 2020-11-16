import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Popup from "../../components/organisms/popup/Popup";
import { store } from "../../../webapp/javascript/index";
import { map } from "../../components/organisms/map/MapGL";
import { showLoading, hideLoading } from "./loadingAction";
import { Provider } from "react-redux";
import { showSignIn } from "./signInModalAction";

const apiUrl = "/api/propertyinformation";

const renderPopup = (longitude, latitude) => {
  
  const property = store.getState().popup;
  const { chart_data } = property;
  const popup = <Provider store={store}><Popup chartData={chart_data} propertyInfo={property}/></Provider>;
  const propertyData = <div>{popup}</div>;
  
  const addPopup=(el) =>{
      const placeholder = document.createElement("div");
      ReactDOM.render(el, placeholder);
  
      const marker = new mapboxgl.Popup()
          .setDOMContent(placeholder)
          .setLngLat([ longitude, latitude ])
          .setMaxWidth("100%")
          .addTo(map);
  };
  addPopup(propertyData);
};

export const getPopup = (propId, longitude, latitude) => async dispatch => {
  const { accessToken } = store.getState().auth;

    dispatch(showLoading());
    dispatch(setPopupRequest());
    await fetch(`${apiUrl}/${propId}`, accessToken ? {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    } : {})
        .then(response => response.json())
        .then(res=>dispatch({ type: "SET_POPUP_LOADED", property: res }))
        .catch(error => console.log(error));
    renderPopup(longitude, latitude);
    dispatch(hideLoading());
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
