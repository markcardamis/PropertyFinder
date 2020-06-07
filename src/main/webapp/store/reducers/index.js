import showPropertyReducer from './showPropertyReducer';
import mapMarkerReducer from './mapMarkerReducer';
import showFilterReducer from './showFilterReducer';
import viewportReducer from './viewportReducer';
import showSignInReducer from './showSignInReducer';
import authReducer from './authReducer';
import showPopupReducer from './showPopupReducer';
import filterReducer from './filterReducer';
import showSaveModalReducer from './showSaveModalReducer';
import showLoadingReducer from './showLoadingReducer';
import { combineReducers } from 'redux';
import showMobileNavReducer from './showMobileNavReducer';

const reducers = combineReducers({
    showProperty: showPropertyReducer,
    showFilter: showFilterReducer,
    showSignIn: showSignInReducer,
    mapMarker: mapMarkerReducer,
    viewport: viewportReducer,
    auth: authReducer,
    showPopup: showPopupReducer,
    filter: filterReducer,
    showSaveModal: showSaveModalReducer,
    showLoading: showLoadingReducer,
    showMobileNav: showMobileNavReducer
});

export default reducers; 