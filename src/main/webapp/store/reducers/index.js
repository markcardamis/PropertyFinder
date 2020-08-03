import { combineReducers } from 'redux';
import propertyModalReducer from './propertyModalReducer';
import mapMarkerReducer from './mapMarkerReducer';
import showFilterReducer from './showFilterReducer';
import viewportReducer from './viewportReducer';
import showSignInReducer from './showSignInReducer';
import authReducer from './authReducer';
import popupReducer from './popupReducer';
import filterReducer from './filterReducer';
import showSaveModalReducer from './showSaveModalReducer';
import showLoadingReducer from './showLoadingReducer';
import showMobileNavReducer from './showMobileNavReducer';
import searchModalReducer from './searchModalReducer';

const reducers = combineReducers({
    propertyModal: propertyModalReducer,
    showFilter: showFilterReducer,
    showSignIn: showSignInReducer,
    mapMarker: mapMarkerReducer,
    viewport: viewportReducer,
    auth: authReducer,
    popup: popupReducer,
    filter: filterReducer,
    showSaveModal: showSaveModalReducer,
    showLoading: showLoadingReducer,
    showMobileNav: showMobileNavReducer,
    searchModal: searchModalReducer
});

export default reducers; 