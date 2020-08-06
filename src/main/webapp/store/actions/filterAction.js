export const filter = (item) => dispatch => {
    dispatch({
        type: 'FILTER',
        payload: item
    });
};