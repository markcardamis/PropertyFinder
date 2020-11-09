import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/notifications";

export const getNotifications = (accessToken) => async dispatch => {
  dispatch(showLoading());
    dispatch(setNotificationsRequest());
    await fetch(`${apiUrl}?type=filters`, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
        .then(response => response.json())
        .then(res=>dispatch({type: "SET_NOTIFICATIONS_LOADED", notifications: res}))
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