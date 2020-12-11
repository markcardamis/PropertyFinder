import axios from 'axios';

import { store } from "../../../javascript";
import { showLoading, hideLoading } from "../loadingAction";

export const deleteWatchListItem = (item) => async dispatch => {
const { accessToken } = store.getState().auth;
const apiUrl = "/api/notifications";

  dispatch(showLoading());
    dispatch(deleteWatchListItemRequest());
    await axios.delete(`${apiUrl}/${item.id}`, 
        {timeout: 5000},
        {
            Authorization: "Bearer " + accessToken
        })
        .then(res=>console.log(res.data))
        .catch(error => console.log(error));
  dispatch(hideLoading());
};

export const deleteWatchListItemRequest = () => dispatch => {
    dispatch({
      type: "DELETE_WATCH_LIST_ITEM"
    });
  };