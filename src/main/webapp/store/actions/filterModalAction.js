export const showFilter = () => dispatch => {
    dispatch({
        type: 'SHOW_FILTER'
    });
};

export const closeFilter = () => dispatch => {
    dispatch({
        type: 'CLOSE_FILTER'
    });
};
