import { showLoading, hideLoading } from './loadingAction';
import {store} from '../../../webapp/javascript/index';
const apiUrl = '/api/notifications';

export const saveNewFilter = (name, frequency) => async dispatch => {
    const {zone, area, price, priceM2, postCode, priceLandvalue, floorspaceRatio} = store.getState().filter;
    const filter = {
        title: name,
        frequency: frequency,
        propertyZone: zone ? zone : null,
        propertyAreaMin: area[0] !== 0 ? area[0] : null,
        propertyAreaMax: area[1] !== 20000 ? area[1] : null,
        propertyPriceMin: price[0] !== 100000 ? price[0] : null,
        propertyPriceMax: price[1] !== 5000000 ? price[1] : null,
        propertyPricePSMMin: priceM2[0] !== 1 ? priceM2[0] : null,
        propertyPricePSMMax: priceM2[1] !== 10000 ? priceM2[1] : null,
        propertyPostCode: postCode !== '' ? postCode : null,
        propertyPriceToLandValueMin: priceLandvalue[0] !== 0 ? priceLandvalue[0] : null,
        propertyPriceToLandValueMax: priceLandvalue[1] !== 10 ? priceLandvalue[1] : null,
        propertyFloorSpaceRatioMin: floorspaceRatio[0] !== 0 ? floorspaceRatio[0] : null,
        propertyFloorSpaceRatioMax: floorspaceRatio[1] !== 2 ? floorspaceRatio[1] : null
    }
    dispatch(showLoading());
    dispatch(saveNewFilterRequest());
    fetch(apiUrl, {
        method: method,
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
            },
        body: JSON.stringify(filter)
    })
        .then(response => response.json())
        .then(res=>console.log(res))
        .catch(error => console.log(error));
    dispatch(hideLoading());
}

export const saveNewFilterRequest = () => dispatch => {
    dispatch({
      type: 'SAVE_NEW_FILTER_REQUEST'
    });
  };

export const setPropertyInfoLoaded = (property) => dispatch => {
  dispatch({
    type: 'SAVE_NEW_FILTER_LOADED',
    property
  });
};

export const filter = (item) => dispatch => {
    dispatch({
        type: 'FILTER',
        payload: item
    });
};