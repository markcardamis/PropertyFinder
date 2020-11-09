import { getUpperCase } from "../../../shared/utils/getUppercase";
import { store } from "../../../javascript";
import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/notifications";

export const saveWatchListItem = (item, frequency) => async dispatch => {
  const { property_id, house_number, street_name, suburb_name, post_code } = store.getState().popup;
  const { accessToken } = store.getState().auth;
    const address = `${house_number} ${getUpperCase(street_name)}, ${getUpperCase(suburb_name)}, ${post_code}`;
    const data = {
        "propertyId": item.id || property_id,
        "frequency": frequency || "WEEKLY",
        "title": address
    };
  
    dispatch(showLoading());
    dispatch(saveWatchListItemRequest());
    await fetch(apiUrl, {
        method: "POST",
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

  export const saveWatchListItemRequest = () => dispatch => {
    dispatch({
      type: "SAVE_WATCH_LIST_ITEM_REQUEST"
    });
  };