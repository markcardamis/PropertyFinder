const initialState = null;

const showPopupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER': 
            return {...action.payload};
        default: 
            return state;
    }
};
export default showPopupReducer;