import { INITIAL_VIEWPORT } from '../../shared/constants';

const viewportChangeReducer = (state=INITIAL_VIEWPORT, action) => {
    switch (action.type) {
        case 'VIEWPORT_CHANGE':
            return action.payload;
        default:
            return state;
    }
};

export default viewportChangeReducer;