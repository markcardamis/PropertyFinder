import showPropertyReducer from './showPropertyReducer';
import authenticationReducer from './authenticationReducer';
import mapMarkerReducer from './mapMarkerReducer';
import showFilterReducer from './showFilterReducer';
import viewportReducer from './viewportReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    showProperty: showPropertyReducer,
    authentication: authenticationReducer,
    showFilter: showFilterReducer,
    mapMarker: mapMarkerReducer,
    viewport: viewportReducer
});

export default reducers; 