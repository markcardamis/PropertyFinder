import axios from '../../../api/axiosConfig';
import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/notifications";

export const deleteNotification = (item, accessToken) => async dispatch => {
  const headers = accessToken ? { Authorization: "Bearer " + accessToken } : {};

    dispatch(showLoading());
      dispatch(deleteNotificationRequest());
      await axios.delete(`${apiUrl}/${item.id}`, 
      { timeout: 10000 , headers })
          .then(res=>console.log(res.data))
          .catch(error => console.log(error));
    dispatch(hideLoading());
  };
  
  export const deleteNotificationRequest = () => dispatch => {
      dispatch({
        type: "DELETE_NOTIFICATION_REQUEST"
      });
    };