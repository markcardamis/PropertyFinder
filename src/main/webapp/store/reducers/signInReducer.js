const signInReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_SIGNIN':
            return !state;
        case 'CLOSE_SIGNIN': 
            return false;
        default: 
            return state;
    }
};

export default signInReducer;