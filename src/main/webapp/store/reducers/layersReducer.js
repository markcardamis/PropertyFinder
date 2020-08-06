const initialState = {
    showModal: false,
    landZoning: false,
    lotSize: false,
    floorSpaceRatio: false,
    heightOfBuilding: false,
    heritage: false
};

const layersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_LAYERS_MODAL':
            return {...state, showModal: true};
        case 'CLOSE_LAYERS_MODAL': 
            return {...state, showModal: false};
        case 'TOGGLE_LAYER':
            return {...state, [action.layer]: !state[action.layer]};
        default: 
            return state;
    }
};

export default layersReducer;