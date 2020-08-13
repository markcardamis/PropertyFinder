import { showLoading, hideLoading } from "./loadingAction";

const apiUrl = `/api/propertyinformation`;


export const getPopup = (propId, e, renderPopup) => async dispatch => {
    dispatch(showLoading());
    dispatch(setPopupRequest());
    await fetch(`${apiUrl}/${propId}`)
        .then(response => response.json())
        .then(res=>dispatch({type: 'SET_POPUP_LOADED', property: res}))
        .catch(error => console.log(error));
    renderPopup(e)
    dispatch(hideLoading());
}

export const setPopupRequest = () => dispatch => {
    dispatch({
      type: 'SET_POPUP_REQUEST'
    });
  };

export const setPopupLoaded = (property) => dispatch => {
  dispatch({
    type: 'SET_POPUP_LOADED',
    property
  });
};

// export const showPopup = (item) => {
//     return {
//         type: 'SHOW_POPUP',
//         payload: item
//     };
// };

export const closePopup = () => {
    return {
        type: 'HIDE_POPUP'
    };
};
