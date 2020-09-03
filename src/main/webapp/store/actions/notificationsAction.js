import { hideLoading, showLoading } from "./loadingAction";

const apiUrl = '/api/notifications';

export const getNotifications = (accessToken) => async dispatch => {
  dispatch(showLoading());
    dispatch(setNotificationsRequest());
    await fetch(apiUrl, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
        .then(response => response.json())
        .then(res=>dispatch({type: 'SET_NOTIFICATIONS_LOADED', notifications: res}))
        .catch(error => console.log(error));
  dispatch(hideLoading());
}

export const setNotificationsRequest = () => dispatch => {
    dispatch({
      type: 'SET_NOTIFICATIONS_REQUEST'
    });
  };

export const setNotificationsLoaded = (notifications) => dispatch => {
  dispatch({
    type: 'SET_NOTIFICATIONS_LOADED',
    notifications
  });
};

export const deleteNotification = (item, accessToken) => async dispatch => {
  dispatch(showLoading());
    dispatch(deleteNotificationRequest());
    await fetch(`${apiUrl}/${item.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
        .then(response => response.json())
        .then(res=>console.log(res))
        .catch(error => console.log(error));
  dispatch(hideLoading());
}

export const deleteNotificationRequest = () => dispatch => {
    dispatch({
      type: 'DELETE_NOTIFICATION_REQUEST'
    });
  };