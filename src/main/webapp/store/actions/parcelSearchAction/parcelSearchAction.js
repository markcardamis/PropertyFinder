import { store } from "../../../webapp/javascript/index";
import { hideLoading, showLoading } from "./loadingAction";
const apiUrl = "/api/propertyinformation?";

export const applyParcelSearch = () => async dispatch => {
    const {zone, postCode, area, buildingHeight, postCode, landValue, floorspaceRatio} = store.getState().parcelSearch;
  
    const values = {
        zone: `zoneCode=${zone ? zone : null}`,
        postCode: `&postCode=${postCode !== "" ? postCode : null}`,
        areaMin: `&areaMin=${area[0] !== 0 ? area[0] : null}`,
        areaMax: `&areaMax=${area[1] !== 20000 ? area[1] : null}`,
        landValueMin: `&landValueMin=${landValue[0] !== 5000 ? landValue[0] : null}`,
        landValueMax: `&landValueMax=${landValue[1] !== 5000000 ? landValue[1] : null}`,
        buildingHeightMin: `&buildingHeightMin=${buildingHeight[0] !== 0 ? buildingHeight[0] : null}`,
        buildingHeightMax: `&buildingHeightMax=${buildingHeight[1] !== 100 ? buildingHeight[0] : null}`,
        floorSpaceRatioMin: `&floorSpaceRatioMin=${floorspaceRatio[0] !== 0 ? floorspaceRatio[0] : null}`,
        floorSpaceRatioMax: `&floorSpaceRatioMax=${floorspaceRatio[1] !== 2 ? floorspaceRatio[1] : null}`
    };
    const query = Object.values(values).join("")
    dispatch(showLoading());
    dispatch(applyParcelSearchRequest());
    await fetch(`${apiUrl}/query`)
        .then(response => response.json())
        .then(res=>dispatch({type: "PARCEL_SEARCH_LOADED", markers: res}))
        .catch(error => console.log(error));
    dispatch(hideLoading());
  };
  
  export const applyParcelSearchRequest = () => dispatch => {
    dispatch({
      type: "PARCEL_SEARCH_REQUEST"
    });
  };