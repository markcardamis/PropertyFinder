const initialState = null;

const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_POPUP': 
            return {...action.payload};
        case 'HIDE_POPUP':
            return null;
        default: 
            return state;
    }
};
export default popupReducer;