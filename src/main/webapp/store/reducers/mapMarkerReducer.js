const mapMarkerReducer = (state = [], action) => {

    switch (action.type) {
        case 'MARKERS':
            return action.payload;
        default:
            return state;
    }
};

export default mapMarkerReducer;