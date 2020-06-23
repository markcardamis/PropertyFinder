const initialState = false;

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_LOADING': 
            return true;
        case 'HIDE_LOADING':
            return false
        default: 
            return state;
    }
};
export default loadingReducer;