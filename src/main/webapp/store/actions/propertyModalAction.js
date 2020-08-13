import {changeMarker, changeAllMarkers} from './mapMarkerAction';
const apiUrl = '/api/listing';

export const getPropertyInfo = (mapMarker) => async dispatch => {
    dispatch(setPropertyInfoRequest());
    fetch(`${apiUrl}/${mapMarker.id}`)
        .then(response => response.json())
        .then(res=>dispatch({type: 'SET_PROPERTY_INFO_LOADED', markers: res}))
        .catch(error => console.log(error));
    dispatch(changeAllMarkers('marker-unvisited'))
    dispatch(changeMarker(mapMarker, 'marker-selected'))
}

export const setPropertyInfoRequest = () => dispatch => {
    dispatch({
      type: 'SET_PROPERTY_INFO_REQUEST'
    });
    //dispatch(showLoading());
  };

export const setPropertyInfoLoaded = (property) => dispatch => {
  dispatch({
    type: 'SET_PROPERTY_INFO_LOADED',
    property
  });
  //dispatch(hideLoading());
};

export const showProperty = (item) => {
    return {
        type: 'SHOW_PROPERTY_INFO',
        payload: item
    };
};

export const closeProperty = () => {
    return {
        type: 'HIDE_PROPERTY_INFO'
    };
};
