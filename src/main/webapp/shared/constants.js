export const MAPBOX_API = process.env.MAPBOX_API;
export const MAPBOX_STYLE = process.env.MAPBOX_STYLE;
export const DEFAULT_HOUSE_IMAGE = 'https://www.vestnorden.com/wp-content/uploads/2018/03/house-placeholder.png';
export const FILTER_PARAMETERS = ['propertyZone', 'propertyAreaMin', 'propertyAreaMax', 'propertyPriceMin', 'propertyPriceMax', 'propertyPricePSMMin', 'propertyPricePSMMax', 'propertyPostCode', 'propertyPriceToLandValueMin', 'propertyPriceToLandValueMax','propertyFloorSpaceRatioMin', 'propertyFloorSpaceRatioMax'];

export const INITIAL_VIEWPORT = {
        width: '100vw',
        height: '100vh',
        latitude: -33.863823,
        longitude: 151.018731,
        zoom: 10
    };
