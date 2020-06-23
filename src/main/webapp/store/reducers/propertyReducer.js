const initialState = {isHidden: false};

const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_PROPERTY': 
            return {...action.payload, isHidden: true};
        case 'CLOSE_PROPERTY':
            return {isHidden: false};
        default: 
            return state;
    }
};

export default propertyReducer;