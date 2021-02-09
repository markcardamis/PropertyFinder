import { propertyId } from "../../../../../constants_temp";

const initialState = {
    "property_id": "",
    "house_number": "",
    "street_name": "",
    "suburb_name": "",
    "post_code": "",
    "zone_code": "",
    "land_value_1": "",
    "area": "",
    "area_type": "",
    "floor_space_ratio": "",
    "minimum_lot_size": "",
    "building_height": "",
    "street_frontage": "",
    "legislation_url": "",
    "last_sold": "",
    "chart_data": {
        "property_sales": [],
        "land_values": []
    },
    "interested_people": "",
    "interested_user": ""
};
// const initialState = propertyId;

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