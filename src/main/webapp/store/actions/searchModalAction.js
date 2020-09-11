export const showSearchModal = () => dispatch => {
    dispatch({
        type: "SHOW_SEARCH_MODAL"
    });
};

export const closeSearchModal = () => dispatch => {
    dispatch({
        type: "CLOSE_SEARCH_MODAL"
    });
};
