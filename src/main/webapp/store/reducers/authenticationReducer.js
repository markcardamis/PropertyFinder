const authenticationReducer = (state=null, action) => {
    switch (action.type) {
        case 'AUTHENTICATED':
            return true;
        case 'NOT_AUTHENTICATED':
            return false;
        default:
            return state;
    }
};

export default authenticationReducer;