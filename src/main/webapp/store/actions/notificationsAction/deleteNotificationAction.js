import axios from '../../../api/axiosConfig';
import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/notifications";

export const deleteNotification = (item, accessToken) => async dispatch => {
    dispatch(showLoading());
      dispatch(deleteNotificationRequest());
      await axios.delete(`${apiUrl}/${item.id}`, 
      {timeout: 10000},
      {
          Authorization: "Bearer " + accessToken
      })
          .then(res=>console.log(res.data))
          .catch(error => console.log(error));
    dispatch(hideLoading());
  };
  
  export const deleteNotificationRequest = () => dispatch => {
      dispatch({
        type: "DELETE_NOTIFICATION_REQUEST"
      });
    };