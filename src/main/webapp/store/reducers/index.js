import showPropertyReducer from './showPropertyReducer';
import authenticationReducer from './authenticationReducer';
import mapMarkerReducer from './mapMarkerReducer';
import showFilterReducer from './showFilterReducer';
import viewportReducer from './viewportReducer';
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

const reducers = combineReducers({
    showProperty: showPropertyReducer,
    authentication: authenticationReducer,
    showFilter: showFilterReducer,
    mapMarker: mapMarkerReducer,
    viewport: viewportReducer,
    form: formReducer,
});

export default reducers; 