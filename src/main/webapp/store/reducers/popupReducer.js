import { propertyId } from "../../../../../contsants_temp";

const initialState = {};
//const initialState = propertyId;

const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_POPUP_REQUEST":
            return state;
        case "SET_POPUP_LOADED":
            return action.property;
        case "HIDE_POPUP":
            return null;
        default: 
            return state;
    }
};
export default popupReducer;