// import { PROPERTY_DATA } from '../../constants/constants';

// const initialState = {...PROPERTY_DATA, isHidden: false};
const initialState = {isHidden: false};

const showPropertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_PROPERTY': 
            return {...action.payload, isHidden: true};
        case 'CLOSE_PROPERTY':
            return {isHidden: false};
        default: 
            return state;
    }
};

export default showPropertyReducer;