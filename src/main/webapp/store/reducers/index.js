import showPropertyReducer from './showPropertyReducer';
import authenticationReducer from './authentication';
import mapMarkerReducer from './mapMarkerReducer';
import showFilterReducer from './showFilterReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    showProperty: showPropertyReducer,
    authentication: authenticationReducer,
    showFilter: showFilterReducer,
    mapMarker: mapMarkerReducer
});

export default reducers; 