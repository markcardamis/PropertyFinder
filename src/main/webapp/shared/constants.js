export const DEFAULT_HOUSE_IMAGE = 'https://www.vestnorden.com/wp-content/uploads/2018/03/house-placeholder.png';
export const FILTER_PARAMETERS = ['propertyZone', 'propertyAreaMin', 'propertyAreaMax', 'propertyPriceMin', 'propertyPriceMax', 'propertyPricePSMMin', 'propertyPricePSMMax', 'propertyPostCode', 'propertyPriceToLandValueMin', 'propertyPriceToLandValueMax','propertyFloorSpaceRatioMin', 'propertyFloorSpaceRatioMax'];
export const MAPBOX_API = process.env.MAPBOX_API;
export const MAPBOX_STYLE = process.env.MAPBOX_STYLE;
export const INITIAL_VIEWPORT = {
        width: '100vw',
        height: '100vh',
        latitude: -33.863823,
        longitude: 151.018731,
        zoom: 10
    };
export const ADDRESS = 'Address';
export const AREA = 'Area';
export const ZONE = 'Zone';
export const PRICE = 'Price';
export const PRICE_TO_LAND_VALUE = 'Price to Land Value';
export const PRICE_PER_M2 = 'Price per m2';
export const LAND_VALUE = 'Land Value';
export const DESCRIPTION = 'Description';
export const FLOOR_SPACE_RATIO = 'Floor Space Ratio';
export const MINIMUM_LOT_SIZE = 'Minimum Lot Size';
export const BUILDING_HEIGHT = 'Building Height';

export const ZONES = [{id: 1, name: 'B1', color: '#f4fefd'}, {
                        id: 2, name: 'B2', color: '#e1fafc'
                    }, {
                        id: 3, name: 'B3', color: '#d4eff9'
                    }, {
                        id: 4, name: 'B4', color: '#e5e7ef'
                    }, {
                        id: 5, name: 'B5', color: '#e0e7e9'
                    }, {
                        id: 6, name: 'B6', color: '#e6eef1'
                    }, {
                        id: 7, name: 'B7', color: '#eff4f6'
                    }, {
                        id: 8, name: 'B8', color: '#f2f8f7'
                    }, {
                        id: 9, name: 'DM', color: '#ffffff'
                    }, {
                        id: 10, name: 'E1', color: '#f6e6cd'
                    }, {
                        id: 11, name: 'E2', color: '#f9ebd4'
                    }, {
                        id: 12, name: 'E3', color: '#fbf0dc'
                    }, {
                        id: 13, name: 'E4', color: '#fdf6e7'
                    }, {
                        id: 14, name: 'IN1', color: '#f5eefb'
                    }, {
                        id: 15, name: 'IN2', color: '#fbf6fe'
                    }, {
                        id: 16, name: 'IN3', color: '#eee5f8'
                    }, {
                        id: 17, name: 'IN4', color: '#e8ddf5'
                    }, {
                        id: 18, name: 'R1', color: '#fcf3fe'
                    }, {
                        id: 19, name: 'R2', color: '#fbeae8'
                    }, {
                        id: 20, name: 'R3', color: '#fadfdb'
                    }, {
                        id: 17, name: 'R4', color: '#fad5d0'
                    }, {
                        id: 17, name: 'R5', color: '#e8ddf5'
                    }, {
                        id: 18, name: 'RE1', color: '#e1fdd2'
                    }, {
                        id: 19, name: 'RE2', color: '#f6fef0'
                    }, {
                        id: 20, name: 'RU1', color: '#faf5ec'
                    }, {
                        id: 21, name: 'RU2', color: '#f7f2e6'
                    }, {
                        id: 22, name: 'RU3', color: '#f5efe1'
                    }, {
                        id: 23, name: 'RU4', color: '#f4eedd'
                    }, {
                        id: 24, name: 'RU5', color: '#f2e8e7'
                    }, {
                        id: 25, name: 'RU6', color: '#efe7d5'
                    }, {
                        id: 26, name: 'SP1', color: '#ffffea'
                    }, {
                        id: 27, name: 'SP2', color: '#fffee0'
                    }, {
                        id: 28, name: 'SP3', color: '#fffed4'
                    }, {
                        id: 29, name: 'UD', color: '#fbe0da'
                    }, {
                        id: 30, name: 'UL', color: '#ffffff'
                    }, {
                        id: 31, name: 'W1', color: '#ebfef7'
                    }, {
                        id: 32, name: 'W2', color: '#ebfef7'
                    }, {
                        id: 33, name: 'W3', color: '#defdef'
                    }, {
                        id: 34, name: 'Non Standard Zones', color: 'lightgray'
                    }]