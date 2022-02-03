import axios from "../../../api/axiosConfig";
import { store } from "../../../javascript";
import { showLoading, hideLoading } from "../loadingAction";

const apiUrl = "/api/notifications";

export const deleteWatchListItem = (item) => async dispatch => {
const { accessToken } = store.getState().auth.accessToken;
const headers = accessToken ? { Authorization: "Bearer " + accessToken } : {};

  dispatch(showLoading());
    dispatch(deleteWatchListItemRequest());
    await axios.delete(`${apiUrl}/${item.id}`, 
        { timeout: 5000, headers })
        .then(res=>console.log(res.data))
        .catch(error => console.log(error));
  dispatch(hideLoading());
};

export const deleteWatchListItemRequest = () => {
    return {
      type: "DELETE_WATCH_LIST_ITEM"
    };
  };