import { filters } from "../../../../../contsants_temp";

const notificationsReducer = (state = [], action) => {
  // const notificationsReducer = (state = filters, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATIONS_REQUEST':
            return state
        case 'SET_NOTIFICATIONS_LOADED':
            return action.notifications
        case 'DELETE_NOTIFICATION_REQUEST':
            return state
        default:
            return state;
    }
};

export default notificationsReducer;