import axios from '../../../api/axiosConfig';
import { store } from "../../../../webapp/javascript/index";
import { map } from "../../../components/organisms/map/MapGL";
import { hideLoading, showLoading } from "../loadingAction";

const apiUrl = "/api/propertyinformation";

export const applyParcelSearch = () => async dispatch => {
    const { zone, postCode, area, buildingHeight, landValue, floorspaceRatio, landOnly, nearbyDA } = store.getState().parcelSearch;
    const { latitude, longitude } = store.getState().viewport;
    const { markers } = store.getState().mapMarker;
    const nearbyDAUrl = `https://api.planningalerts.org.au/applications.js?key=1iQRahpMr6dxwRGN9fgM&lat=${latitude}&lng=${longitude}&radius=2000`

    const handleDisplayParcels = () => {
      const parcels = store.getState().parcelSearch.result;
      let array = parcels.map(item => item.property_id);
      if (array.length > 0) {
          let filter = [ "in", [ "get", "propid" ], [ "literal", array ] ];
          map.setFilter("nsw-property-highlighted", filter);
      }
    };

    let headers = {
      "centreLatitude": latitude,
      "centreLongitude": longitude
    };

    const queryValues = {
        zone: `zoneCode=${zone !== null ? zone : ""}`,
        postCode: `&postCode=${postCode}`,
        areaMin: `&areaMin=${area[0] !== 0 ? area[0] : ""}`,
        areaMax: `&areaMax=${area[1] !== 20000 ? area[1] : ""}`,
        landValueMin: `&landValueMin=${landValue[0] !== 100000 ? landValue[0] : ""}`,
        landValueMax: `&landValueMax=${landValue[1] !== 5000000 ? landValue[1] : ""}`,
        buildingHeightMin: `&buildingHeightMin=${buildingHeight[0] !== 0 ? buildingHeight[0] : ""}`,
        buildingHeightMax: `&buildingHeightMax=${buildingHeight[1] !== 100 ? buildingHeight[1] : ""}`,
        floorSpaceRatioMin: `&floorSpaceRatioMin=${floorspaceRatio[0] !== 0 ? floorspaceRatio[0] : ""}`,
        floorSpaceRatioMax: `&floorSpaceRatioMax=${floorspaceRatio[1] !== 2 ? floorspaceRatio[1] : ""}`,
        landOnly: `&landOnly=${landOnly !== null ? landOnly : false}`
    };
    const queryParameters = Object.values(queryValues).join("");
    dispatch(showLoading());
    dispatch(applyParcelSearchRequest());
    await axios.get(`${apiUrl}?${queryParameters}`, 
          { timeout: 15000, headers })
        .then(res => dispatch({ type: "PARCEL_SEARCH_LOADED", payload: res.data }))
        .catch(error => console.log(error));
    nearbyDA ? 
      await axios.get(nearbyDAUrl, { timeout: 5000 })
          .then(res=>dispatch({ type: "SET_MAP_MARKERS_LOADED", payload: { markers, nearbyDAMarkers: res.data } }))
          .catch(error => console.log(error)) 
          : 
        dispatch({ type: "SET_MAP_MARKERS_LOADED", payload: { markers, nearbyDAMarkers: res.data } })
    handleDisplayParcels();
    dispatch(hideLoading());
  };
  
  export const applyParcelSearchRequest = () => dispatch => {
    dispatch({
      type: "PARCEL_SEARCH_REQUEST"
    });
  };