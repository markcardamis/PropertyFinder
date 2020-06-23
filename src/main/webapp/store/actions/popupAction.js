export const showPopup = (item) => {
    return {
        type: 'SHOW_POPUP',
        payload: item
    };
};

export const closePopup = () => {
    return {
        type: 'HIDE_POPUP'
    };
};
