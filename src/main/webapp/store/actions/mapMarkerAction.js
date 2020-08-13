import React from 'react';
import MapMarker from '../../assets/icons/MapMarker'
import { hideLoading, showLoading } from "./loadingAction";

const apiUrl = '/api/listing';

export const getMapMarkers = (renderMarkers) => async dispatch => {
    dispatch(showLoading());
    dispatch(setMapMarkersRequest());
    await fetch(apiUrl)
        .then(response => response.json())
        .then(res=>dispatch({type: 'SET_MAP_MARKERS_LOADED', markers: res}))
        .catch(error => console.log(error));
    const mp = <div><MapMarker/></div>
    renderMarkers(mp)
    dispatch(hideLoading());
}

export const setMapMarkersRequest = () => dispatch => {
    dispatch({
      type: 'SET_MAP_MARKERS_REQUEST'
    });
  };

export const setMapMarkersLoaded = (markers) => dispatch => {
  dispatch({
    type: 'SET_MAP_MARKERS_LOADED',
    markers
  });
};

export const changeMarker = (item, status) => {
    return {
        type: 'CHANGE_MARKER_STATUS',
        payload: item,
        status
    };
};

export const changeAllMarkers = (item, status) => {
    return {
        type: 'CHANGE_ALL_MARKERS_STATUS',
        payload: item,
        status
    };
};

// export const markers = (item, status) => {
//   return {
//       type: 'MARKERS',
//       payload: item
//   };
// };


