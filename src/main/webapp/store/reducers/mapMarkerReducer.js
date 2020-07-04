import { points } from "../../../../../contsants_temp";

//const mapMarkerReducer = (state = [], action) => {
    const mapMarkerReducer = (state = points, action) => {

    switch (action.type) {
        case 'MARKERS':
            return action.payload;
        case 'CHANGE_MARKER_STATUS':
            const idArray = state.map(x=>{
                let array = [];
                return array = [...array, x.id]
            })
            const index = idArray.flat().indexOf(action.payload.id)
            const newMarker = {...action.payload, markerStatus: action.status}
            const newState = [...state.slice(0, index), newMarker, ...state.slice(index+1, state.length+1)]
            return newState
        default:
            return state;
    }
};

export default mapMarkerReducer;