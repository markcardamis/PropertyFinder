import showPropertyReducer from './showPropertyReducer';
import mapMarkerReducer from './mapMarkerReducer';
import showFilterReducer from './showFilterReducer';
import viewportReducer from './viewportReducer';
import showSignInReducer from './showSignInReducer';
import authReducer from './authReducer';
import showPopupReducer from './showPopupReducer';
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

const reducers = combineReducers({
    showProperty: showPropertyReducer,
    showFilter: showFilterReducer,
    showSignIn: showSignInReducer,
    mapMarker: mapMarkerReducer,
    viewport: viewportReducer,
    form: formReducer,
    auth: authReducer,
    showPopup: showPopupReducer
});

export default reducers; 