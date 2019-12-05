// import { PROPERTY_DATA } from '../../constants/constants';

// const mapMarkerReducer = (state = PROPERTY_DATA, action) => {
const mapMarkerReducer = (state = '', action) => {

    switch (action.type) {
        case 'MARKERS':
            return action.payload;
        default:
            return state;
    }
};

export default mapMarkerReducer;