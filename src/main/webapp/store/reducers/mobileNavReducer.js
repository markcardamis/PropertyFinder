const mobileNavReducer = (state = false, action) => {
    switch (action.type) {
        case "SHOW_MOBILE_NAV":
            return !state;
        case "CLOSE_MOBILE_NAV": 
            return false;
        default: 
            return state;
    }
};

export default mobileNavReducer;