const apiUrl = `/api/propertyinformation`;


export const getPopup = (propId, e, renderPopup) => async dispatch => {
    dispatch(setPopupRequest());

    await fetch(`${apiUrl}/${propId}`)
        .then(response => response.json())
        .then(res=>dispatch({type: 'SET_POPUP_LOADED', property: res}))
        .catch(error => console.log(error));
    renderPopup(e)
}

export const setPopupRequest = () => dispatch => {
    dispatch({
      type: 'SET_POPUP_REQUEST'
    });
    //dispatch(showLoading());
  };

export const setPopupLoaded = (property) => dispatch => {
  dispatch({
    type: 'SET_POPUP_LOADED',
    property
  });
  //dispatch(hideLoading());
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
