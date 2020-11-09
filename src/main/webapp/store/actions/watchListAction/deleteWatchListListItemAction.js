import { store } from "../../../javascript";
import { showLoading, hideLoading } from "../loadingAction";

export const deleteWatchListItem = (item) => async dispatch => {
const { accessToken } = store.getState().auth;
const apiUrl = "/api/notifications";

  dispatch(showLoading());
    dispatch(deleteWatchListItemRequest());
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

export const deleteWatchListItemRequest = () => dispatch => {
    dispatch({
      type: "DELETE_WATCH_LIST_ITEM"
    });
  };