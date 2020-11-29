import { parcels } from "../../../../../constants_temp";
const initialFilter = { 
    zone: null,
    postCode: "",
    area: [ 0, 20000 ],
    buildingHeight: [ 0, 100 ],
    floorspaceRatio: [ 0, 2 ],
    landValue: [ 100000, 5000000 ],
    result: []
};

const parselSearchReducer = (state = initialFilter, action) => {

    switch (action.type) {
        case "SET_PARCEL_FILTER":
            return { ...action.payload };
        case "RESET_PARCEL_FILTER":
            return initialFilter;
        case "APPLY_PARCEL_SEARCH_REQUEST":
            return state;
        case "PARCEL_SEARCH_LOADED":
            return {...state, result: action.payload};
        default:
            return state;
    }
};

export default parselSearchReducer;