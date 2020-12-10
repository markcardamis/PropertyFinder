import axios from 'axios';

import { store } from "../../../javascript";
import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/notifications";

export const changeWatchListFrequency = (item, frequency) => async dispatch => {
  const { accessToken } = store.getState().auth;
  const data = { "frequency": frequency };

    dispatch(showLoading());
    dispatch(changeWatchListFrequencyRequest());
    await axios.patch(`${apiUrl}/${item.id}`, JSON.stringify(data), {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
    })
        .then(res=>console.log(res.data))
        .catch(error => console.log(error));
    dispatch(hideLoading());
  };

  export const changeWatchListFrequencyRequest = () => dispatch => {
    dispatch({
      type: "CHANGE_WATCH_LIST_FREQUENCY_REQUEST"
    });
  };