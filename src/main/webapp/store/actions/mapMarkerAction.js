import { closeLoading, showLoading } from "./showLoadingAction";

const apiUrl = '/api/listing';

export const getMapMarkers = () => async dispatch => {
    dispatch(setMapMarkersRequest());
    fetch(apiUrl)
        .then(response => response.json())
        .then(res=>dispatch({type: 'SET_MAP_MARKERS_LOADED', markers: res}))
        .catch(error => console.log(error));
}

export const setMapMarkersRequest = () => dispatch => {
    dispatch({
      type: 'SET_MAP_MARKERS_REQUEST'
    });
    //dispatch(showLoading());
  };

export const setMapMarkersLoaded = (markers) => dispatch => {
  dispatch({
    type: 'SET_MAP_MARKERS_LOADED',
    markers
  });
  //dispatch(hideLoading());
};


export const mapMarker = (item) => {
    return {
        type: 'MAP_MARKER',
        payload: item
    };
};

export const changeMarker = (item, status) => {
    return {
        type: 'CHANGE_MARKER',
        payload: item,
        status
    };
};

export const changeAllMarkers = (status) => {
    return {
        type: 'CHANGE_ALL_MARKERS_STATUS',
        status
    };
};


