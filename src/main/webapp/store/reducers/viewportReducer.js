const initialState = {
    width: '100vw',
    height: '100vh',
    latitude: -33.865143,
    longitude: 151.209900,
    zoom: 13
};

const authenticationReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'VIEWPORT_CHANGE':
            return action.payload;
        default:
            return state;
    }
};

export default authenticationReducer;