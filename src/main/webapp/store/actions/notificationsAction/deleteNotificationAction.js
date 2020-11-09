import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/notifications";

export const deleteNotification = (item, accessToken) => async dispatch => {
    dispatch(showLoading());
      dispatch(deleteNotificationRequest());
      await fetch(`${apiUrl}/${item.id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })
          .then(response => response.json())
          .then(res=>console.log(res))
          .catch(error => console.log(error));
    dispatch(hideLoading());
  };
  
  export const deleteNotificationRequest = () => dispatch => {
      dispatch({
        type: "DELETE_NOTIFICATION_REQUEST"
      });
    };