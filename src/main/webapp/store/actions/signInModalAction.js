export const showSignIn = () => dispatch => {
    dispatch({
        type: 'SHOW_SIGNIN'
    });
};

export const closeSignIn = () => dispatch => {
    dispatch({
        type: 'CLOSE_SIGNIN'
    });
};