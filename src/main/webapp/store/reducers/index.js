import { combineReducers } from "redux";
import propertyModalReducer from "./propertyModalReducer";
import mapMarkerReducer from "./mapMarkerReducer";
import filterModalReducer from "./filterModalReducer";
import viewportChangeReducer from "./viewportReducer";
import signInModalReducer from "./signInModalReducer";
import authReducer from "./authReducer";
import popupReducer from "./popupReducer";
import filterReducer from "./filterReducer";
import saveModalReducer from "./saveModalReducer";
import loadingReducer from "./loadingReducer";
import mobileNavReducer from "./mobileNavReducer";
import searchModalReducer from "./searchModalReducer";
import layersReducer from "./layersReducer";
import searchResultsReducer from "./searchReducer";
import notificationsReducer from "./notificationsReducer";
import searchAreaBtnReducer from "./searchAraBtnReducer";
import watchListReducer from './watchListReducer';
import parcelSearchReducer from './parcelSearchReducer';

const reducers = combineReducers({
    propertyModal: propertyModalReducer,
    filterModal: filterModalReducer,
    signInModal: signInModalReducer,
    mapMarker: mapMarkerReducer,
    viewport: viewportChangeReducer,
    auth: authReducer,
    popup: popupReducer,
    filter: filterReducer,
    saveModal: saveModalReducer,
    loading: loadingReducer,
    mobileNav: mobileNavReducer,
    searchModal: searchModalReducer,
    layers: layersReducer,
    searchResults: searchResultsReducer,
    notifications: notificationsReducer,
    searchAreaBtn: searchAreaBtnReducer,
    watchList: watchListReducer,
    parcelSearch: parcelSearchReducer
});

export default reducers; 