import { propertyId } from "../../../../../contsants_temp";

const initialState = null;

const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POPUP_REQUEST':
            return state
        case 'SET_POPUP_LOADED':
            return action.markers
        case 'SHOW_POPUP': 
            //return {...action.payload};
            return propertyId
        case 'HIDE_POPUP':
            return null;
        default: 
            return state;
    }
};
export default popupReducer;