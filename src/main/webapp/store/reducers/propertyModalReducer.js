const initialState = {isHidden: false};

const propertyModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_PROPERTY_INFO': 
            return {...action.payload, isHidden: true};
        case 'SET_PROPERTY_INFO_REQUEST':
            return state
        case 'SET_PROPERTY_INFO_LOADED':
            return action.markers
        case 'HIDE_PROPERTY_INFO':
            return {isHidden: false};
        default: 
            return state;
    }
};

export default propertyModalReducer;