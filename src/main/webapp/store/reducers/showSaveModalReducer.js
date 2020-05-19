const showSaveModalReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_SAVE_MODAL':
            return !state;
        case 'CLOSE_SAVE_MODAL': 
            return false;
        default: 
            return state;
    }
};

export default showSaveModalReducer;