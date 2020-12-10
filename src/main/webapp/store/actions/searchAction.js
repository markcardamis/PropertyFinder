import axios from 'axios';

import { hideLoading, showLoading } from "./loadingAction";

const apiUrl = "/api/propertyinformation/query?address=";

export const getSearchResults = (query) => async dispatch => {
    dispatch(showLoading());
    dispatch(setSearchResultsRequest());
    await axios.get(apiUrl+query)
        .then(res=>dispatch({ type: "SET_SEARCH_RESULTS_LOADED", searchResults: res.data }))
        .catch(error => console.log(error));
    dispatch(hideLoading());
};

export const setSearchResultsRequest = () => dispatch => {
    dispatch({
      type: "SET_SEARCH_RESULTS_REQUEST"
    });
  };

export const setSearchResultsLoaded = (searchResults) => dispatch => {
  dispatch({
    type: "SET_SEARCH_RESULTS_LOADED",
    searchResults
  });
};