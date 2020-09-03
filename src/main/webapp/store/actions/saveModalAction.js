export const showSaveModal = () => dispatch => {
    return {
        type: 'SHOW_SAVE_MODAL'
    };
};

export const closeSaveModal = () => dispatch => {
    dispatch({
        type: 'CLOSE_SAVE_MODAL'
    });
};

export const saveNotification = (name, frequency) => dispatch => {
    dispatch({
        type: 'SAVE_NOTIFICATION', 
        name,
        frequency
    });
};
