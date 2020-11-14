import { filters } from "../../../../../constants_temp";

const watchListReducer = (state = [], action) => {
//   const watchListReducer = (state = filters, action) => {
    switch (action.type) {
        case "SET_WATCH_LIST_REQUEST":
            return state;
        case "SET_WATCH_LIST_LOADED":
            return action.data;
        case "DELETE_WATCH_LIST_ITEM":
            return state;
        case "CHANGE_WATCH_LIST_FREQUENCY_REQUEST":
            return state;
        default:
            return state;
    }
};

export default watchListReducer;