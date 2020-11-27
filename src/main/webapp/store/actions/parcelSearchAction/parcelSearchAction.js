import { store } from "../../../../webapp/javascript/index";
import { hideLoading, showLoading } from "../loadingAction";
const apiUrl = "/api/propertyinformation";

export const applyParcelSearch = () => async dispatch => {
    const {zone, postCode, area, buildingHeight, landValue, floorspaceRatio} = store.getState().parcelSearch;
    const {latitude, longitude} = store.getState().viewport;

    const values = {
        zone: `zoneCode=${zone !== null ? zone : ''}`,
        postCode: `&postCode=${postCode}`,
        areaMin: `&areaMin=${area[0]}`,
        areaMax: `&areaMax=${area[1]}`,
        landValueMin: `&landValueMin=${landValue[0]}`,
        landValueMax: `&landValueMax=${landValue[1]}`,
        buildingHeightMin: `&buildingHeightMin=${buildingHeight[0]}`,
        buildingHeightMax: `&buildingHeightMax=${buildingHeight[1]}`,
        floorSpaceRatioMin: `&floorSpaceRatioMin=${floorspaceRatio[0]}`,
        floorSpaceRatioMax: `&floorSpaceRatioMax=${floorspaceRatio[1]}`,
        centreLatitude: `&centreLatitude=${latitude}`,
        centreLongitude: `&centreLongitude=${longitude}`
    };
    const query = Object.values(values).join("")
    dispatch(showLoading());
    dispatch(applyParcelSearchRequest());
    await fetch(`${apiUrl}?${query}`)
        .then(response => response.json())
        .then(res=>dispatch({type: "PARCEL_SEARCH_LOADED", payload: res}))
        .catch(error => console.log(error));
    dispatch(hideLoading());
  };
  
  export const applyParcelSearchRequest = () => dispatch => {
    dispatch({
      type: "PARCEL_SEARCH_REQUEST"
    });
  };