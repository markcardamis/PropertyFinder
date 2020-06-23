export const showLoading = (item) => {
    return {
        type: 'SHOW_LOADING',
        payload: item
    };
};

export const closeLoading = () => {
    return {
        type: 'HIDE_LOADING'
    };
};
