export const showMobileNav = () => dispatch => {
    dispatch({
        type: 'SHOW_MOBILE_NAV'
    });
};

export const closeMobileNav = () => dispatch => {
    dispatch({
        type: 'CLOSE_MOBILE_NAV'
    });
};
