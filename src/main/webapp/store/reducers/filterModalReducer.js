const filterModalReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_FILTER':
            return !state;
        case 'CLOSE_FILTER': 
            return false;
        default: 
            return state;
    }
};

export default filterModalReducer;