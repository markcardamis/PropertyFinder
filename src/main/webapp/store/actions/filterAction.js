import axios from "../../api/axiosConfig";
import { store } from "../../../webapp/javascript/index";
import { hideLoading, showLoading } from "./loadingAction";
const apiUrl = "/api/notifications";

export const saveFilter = (accessToken, name, frequency, editedFilter) => async dispatch => {
    const { zone, area, streetFrontage, price, priceM2, postCode, priceLandvalue, floorspaceRatio, landOnly, nearbyDA } = store.getState().filter;
    const filter = {
        title: name ? name : "Untitled",
        frequency: frequency==null ? "OFF" : frequency,
        propertyZone: zone ? zone : null,
        propertyAreaMin: area[0] !== 0 ? area[0] : null,
        propertyAreaMax: area[1] !== 20000 ? area[1] : null,
        streetFrontageMin: area[0] !== 0 ? streetFrontage[0] : null,
        streetFrontageMax: area[1] !== 20 ? streetFrontage[1] : null,
        propertyPriceMin: price[0] !== 100000 ? price[0] : null,
        propertyPriceMax: price[1] !== 5000000 ? price[1] : null,
        propertyPricePSMMin: priceM2[0] !== 1 ? priceM2[0] : null,
        propertyPricePSMMax: priceM2[1] !== 10000 ? priceM2[1] : null,
        propertyPostCode: postCode !== "" ? postCode : null,
        propertyPriceToLandValueMin: priceLandvalue[0] !== 0 ? priceLandvalue[0] : null,
        propertyPriceToLandValueMax: priceLandvalue[1] !== 10 ? priceLandvalue[1] : null,
        propertyFloorSpaceRatioMin: floorspaceRatio[0] !== 0 ? floorspaceRatio[0] : null,
        propertyFloorSpaceRatioMax: floorspaceRatio[1] !== 2 ? floorspaceRatio[1] : null,
        landOnly: landOnly !== null ? landOnly : false,
        nearbyDA: nearbyDA !== null ? nearbyDA : false,
    };
    const headers = accessToken ? { Authorization: "Bearer " + accessToken } : {};
    
    dispatch(showLoading());
    dispatch(saveFilterRequest());
    const method = editedFilter ? axios.put : axios.post;
    await method(
            `${apiUrl}${editedFilter ? "/"+editedFilter.id : ""}`,
            JSON.stringify(filter), 
            { timeout: 5000, headers })
        .then(res=>console.log(res.data))
        .catch(error => console.log(error));
    dispatch(hideLoading());
};

export const saveFilterRequest = () => dispatch => {
    dispatch({
      type: "SAVE_FILTER_REQUEST"
    });
  };

export const getFilter = (item) => dispatch => {
    dispatch({
        type: "GET_FILTER",
        payload: item
    });
};

export const resetFilter = () => dispatch => {
    dispatch({
        type: "RESET_FILTER"
    });
};