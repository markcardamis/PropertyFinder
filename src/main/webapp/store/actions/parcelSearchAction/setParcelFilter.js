export const setParcelFilter = (item) => dispatch => {
    dispatch({
        type: "SET_PARCEL_FILTER",
        payload: item
    });
};

export const resetParcelFilter = () => dispatch => {
    dispatch({
        type: "RESET_PARCEL_FILTER",
    });
};