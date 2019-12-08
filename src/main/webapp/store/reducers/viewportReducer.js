import { INITIAL_VIEWPORT } from '../../constants/constants'

const authenticationReducer = (state=INITIAL_VIEWPORT, action) => {
    switch (action.type) {
        case 'VIEWPORT_CHANGE':
            return action.payload;
        default:
            return state;
    }
};

export default authenticationReducer;