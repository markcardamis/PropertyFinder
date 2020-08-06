export const showSaveModal = () => dispatch => {
    dispatch({
        type: 'SHOW_SAVE_MODAL'
    });
};

export const closeSaveModal = () => dispatch => {
    dispatch({
        type: 'CLOSE_SAVE_MODAL'
    });
};
