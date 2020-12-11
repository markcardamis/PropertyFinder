import axios from 'axios';

import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/notifications?type=filters";

export const getNotifications = (accessToken) => async dispatch => {
  dispatch(showLoading());
    dispatch(setNotificationsRequest());
    await axios.get(apiUrl, 
      {timeout: 10000},
      {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
        .then(res=>dispatch({ type: "SET_NOTIFICATIONS_LOADED", notifications: res.data }))
        .catch(error => console.log(error));
  dispatch(hideLoading());
};

export const setNotificationsRequest = () => dispatch => {
    dispatch({
      type: "SET_NOTIFICATIONS_REQUEST"
    });
  };

export const setNotificationsLoaded = (notifications) => dispatch => {
  dispatch({
    type: "SET_NOTIFICATIONS_LOADED",
    notifications
  });
};