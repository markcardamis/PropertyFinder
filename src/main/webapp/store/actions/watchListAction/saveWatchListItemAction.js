import axios from 'axios';

import { getUpperCase } from "../../../shared/utils/getUppercase";
import { store } from "../../../javascript";
import { hideLoading, showLoading } from "../loadingAction";
import { showSignIn } from "../signInModalAction";

const apiUrl = "/api/notifications";

export const saveWatchListItem = () => async dispatch => {

  const { accessToken } = store.getState().auth;
  const { property_id, house_number, street_name, suburb_name, post_code } = store.getState().popup;
  const address = `${house_number} ${getUpperCase(street_name)}, ${getUpperCase(suburb_name)}, ${post_code}`;
  const data = {
        "propertyId": property_id,
        "frequency": "WEEKLY",
        "title": address
    };
  if (accessToken) {
    dispatch(showLoading());
    dispatch(saveWatchListItemRequest());
    await axios.post(apiUrl, JSON.stringify(data), {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
    })
        .then(res=>console.log(res.data))
        .catch(error => console.log(error));
    dispatch(hideLoading());
  } else {
    dispatch(showSignIn());
    }
  };

  export const saveWatchListItemRequest = () => dispatch => {
    dispatch({
      type: "SAVE_WATCH_LIST_ITEM_REQUEST"
    });
  };