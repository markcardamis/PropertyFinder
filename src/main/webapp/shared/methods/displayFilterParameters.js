import { change } from 'redux-form';


export const displayFilterParameters = (item) => {
    this.props.dispatch(change('filter', 'propertyZone', item.propertyZone));
    this.props.dispatch(change('filter', 'propertyAreaMin', item.propertyAreaMin));
    this.props.dispatch(change('filter', 'propertyAreaMax', item.propertyAreaMax));
    this.props.dispatch(change('filter', 'propertyPriceMin', item.propertyPriceMin));
    this.props.dispatch(change('filter', 'propertyPriceMax', item.propertyPriceMax));
    this.props.dispatch(change('filter', 'propertyPricePSMMin', item.propertyPricePSMMin));
    this.props.dispatch(change('filter', 'propertyPricePSMMax', item.propertyPricePSMMax));
    this.props.dispatch(change('filter', 'propertyPostCode', item.propertyPostCode));
    this.props.dispatch(change('filter', 'propertyPriceToLandValueMin', item.propertyPriceToLandValueMin));
    this.props.dispatch(change('filter', 'propertyPriceToLandValueMax', item.propertyPriceToLandValueMax));
    this.props.dispatch(change('filter', 'propertyFloorSpaceRatioMin', item.propertyFloorSpaceRatioMin));
    this.props.dispatch(change('filter', 'propertyFloorSpaceRatioMax', item.propertyPriceToLandValueMin));
};