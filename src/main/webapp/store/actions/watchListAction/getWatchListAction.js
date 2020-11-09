import { store } from "../../../javascript";
import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/notifications?type=wastchlist";

export const getWatchList = () => async dispatch => {
  const { accessToken } = store.getState().auth;
  dispatch(showLoading());
    dispatch(setWatchListRequest());
    await fetch(apiUrl, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
        .then(response => response.json())
        .then(res=>dispatch({type: "SET_WATCH_LIST_LOADED", data: res}))
        .catch(error => console.log(error));
  dispatch(hideLoading());
};

export const setWatchListRequest = () => dispatch => {
    dispatch({
      type: "SET_WATCH_LIST_REQUEST"
    });
  };

export const setWatchListLoaded = (data) => dispatch => {
  dispatch({
    type: "SET_WATCH_LIST_LOADED",
    data
  });
};