export const showSearchArea = () => dispatch => {
    dispatch({
        type: "SHOW_SEARCH_AREA"
    });
};

export const hideSearchArea = () => dispatch => {
    dispatch({
        type: "CLOSE_SEARCH_AREA"
    });
};
