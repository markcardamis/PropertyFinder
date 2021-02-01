import axios from '../../../api/axiosConfig';
import { store } from "../../../javascript";
import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/notifications";

export const changeWatchListFrequency = (item, frequency) => async dispatch => {
  const { accessToken } = store.getState().auth;
  const headers = accessToken ? { Authorization: "Bearer " + accessToken } : {};
  const data = { "frequency": frequency };

    dispatch(showLoading());
    dispatch(changeWatchListFrequencyRequest());
    await axios.patch(`${apiUrl}/${item.id}`, 
          JSON.stringify(data), 
          { timeout: 5000, headers })
        .then(res=>console.log(res.data))
        .catch(error => console.log(error));
    dispatch(hideLoading());
  };

  export const changeWatchListFrequencyRequest = () => dispatch => {
    dispatch({
      type: "CHANGE_WATCH_LIST_FREQUENCY_REQUEST"
    });
  };