import { removeMapPopup } from "../../shared/utils/removeMapPopup";

const filterModalReducer = (state = false, action) => {
    switch (action.type) {
        case "SHOW_FILTER":
            removeMapPopup();
            return !state;
        case "CLOSE_FILTER": 
            return false;
        default: 
            return state;
    }
};

export default filterModalReducer;