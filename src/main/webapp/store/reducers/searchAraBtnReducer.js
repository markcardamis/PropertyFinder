const searchAreaBtnReducer = (state = false, action) => {
    switch (action.type) {
        case "SHOW_SEARCH_AREA":
            return true;
        case "CLOSE_SEARCH_AREA": 
            return false;
        default: 
            return state;
    }
};

export default searchAreaBtnReducer;