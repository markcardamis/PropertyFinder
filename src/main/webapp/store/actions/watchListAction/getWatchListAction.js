import axios from "../../../api/axiosConfig";
import { store } from "../../../javascript";
import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/notifications?type=watchlist";

export const getWatchList = () => async dispatch => {
  const { accessToken } = store.getState().auth;
  const headers = accessToken ? { Authorization: "Bearer " + accessToken } : {};

  dispatch(showLoading());
    dispatch(setWatchListRequest());
    await axios.get(apiUrl, 
      { timeout: 10000, headers })
        .then(res=>dispatch({ type: "SET_WATCH_LIST_LOADED", data: res.data }))
        .catch(error => console.log(error));
  dispatch(hideLoading());
};

export const setWatchListRequest = () => {
    return {
      type: "SET_WATCH_LIST_REQUEST"
    };
  };

export const setWatchListLoaded = (data) => {
  return {
    type: "SET_WATCH_LIST_LOADED",
    data
  };
};