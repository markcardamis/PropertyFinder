import { searchResult } from "../../../../../constants_temp";

//const initialState = searchResult;
const initialState = [];

const SearchResultsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_SEARCH_RESULTS_REQUEST":
            return state;
        case "SET_SEARCH_RESULTS_LOADED":
            return action.searchResults;
        default:
            return state;
    }
};

export default SearchResultsReducer;