import { store } from "../../../javascript";
import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/notifications";

export const changeWatchListFrequency = (item, frequency) => async dispatch => {
  const { accessToken } = store.getState().auth;
  const data = { "frequency": frequency };

    dispatch(showLoading());
    dispatch(changeWatchListFrequencyRequest());
    await fetch(`${apiUrl}/${item.id}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
            },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(res=>console.log(res))
        .catch(error => console.log(error));
    dispatch(hideLoading());
  };

  export const changeWatchListFrequencyRequest = () => dispatch => {
    dispatch({
      type: "CHANGE_WATCH_LIST_FREQUENCY_REQUEST"
    });
  };