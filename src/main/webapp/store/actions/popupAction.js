import React from "react";

import axios from "../../api/axiosConfig";
import Popup from "../../components/organisms/popup/Popup";
import { store } from "../../../webapp/javascript/index";
import { showLoading, hideLoading } from "./loadingAction";
import { Provider } from "react-redux";
import { renderPopup } from "../../shared/utils/renderPopup";

const apiUrl = "/api/propertyinformation";

export const getPopup = (propId, longitude, latitude) => async dispatch => {
  const { accessToken } = store.getState().auth;
  const propertyInfo = store.getState().popup;
  const headers = accessToken ? { Authorization: "Bearer " + accessToken } : {}

  const popup = <Provider store={store}><Popup propertyInfo={propertyInfo}/></Provider>;
  
    dispatch(showLoading());
    dispatch(setPopupRequest());
    await axios.get(`${apiUrl}/${propId}`, 
      { timeout: 5000, headers })
        .then(res=>dispatch({ type: "SET_POPUP_LOADED", property: res.data }))
        .catch(error => console.log(error));
    renderPopup(longitude, latitude, popup);
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
