const initialState = {showModal: false}
const saveModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_SAVE_MODAL':
            return {...state, showModal: !state};
        case 'CLOSE_SAVE_MODAL': 
            return {...state, showModal: false};
        case 'SAVE_NOTIFICATION': 
            return {name: action.name, frequency: action.frequency, showModal: false};
        default: 
            return state;
    }
};

export default saveModalReducer;