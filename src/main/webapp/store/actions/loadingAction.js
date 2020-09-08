export const showLoading = (item) => {
    return {
        type: "SHOW_LOADING",
        payload: item
    };
};

export const hideLoading = () => {
    return {
        type: "HIDE_LOADING"
    };
};
