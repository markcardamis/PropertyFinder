const showPropertyReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_PROPERTY': 
            return true;
        case 'CLOSE_PROPERTY':
            return false;
        default: 
            return state;
    }
};

export default showPropertyReducer;