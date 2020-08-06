import { combineReducers } from 'redux';
import propertyModalReducer from './propertyModalReducer';
import mapMarkerReducer from './mapMarkerReducer';
import filterModalReducer from './filterModalReducer';
import viewportReducer from './viewportReducer';
import signInModalReducer from './signInModalReducer';
import authReducer from './authReducer';
import popupReducer from './popupReducer';
import filterReducer from './filterReducer';
import saveModalReducer from './saveModalReducer';
import loadingReducer from './loadingReducer';
import mobileNavReducer from './mobileNavReducer';
import searchModalReducer from './searchModalReducer';

const reducers = combineReducers({
    propertyModal: propertyModalReducer,
    filterModal: filterModalReducer,
    signInModal: signInModalReducer,
    mapMarker: mapMarkerReducer,
    viewport: viewportReducer,
    auth: authReducer,
    popup: popupReducer,
    filter: filterReducer,
    saveModal: saveModalReducer,
    loading: loadingReducer,
    mobileNav: mobileNavReducer,
    searchModal: searchModalReducer
});

export default reducers; 