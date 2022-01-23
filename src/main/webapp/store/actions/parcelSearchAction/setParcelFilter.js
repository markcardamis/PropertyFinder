export const setParcelFilter = (item) => {
    return {
        type: "SET_PARCEL_FILTER",
        payload: item
    };
};

export const resetParcelFilter = () => {
    return {
        type: "RESET_PARCEL_FILTER",
    };
};