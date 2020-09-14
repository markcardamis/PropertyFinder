import { points } from "../../../../../constants_temp";

const mapMarkerReducer = (state = [], action) => {
   //const mapMarkerReducer = (state = points, action) => {
    switch (action.type) {
        case "SET_MAP_MARKERS_REQUEST":
            return state;

        case "SET_MAP_MARKERS_LOADED":
            const newArr = action.markers.map(v => ({...v, status: "marker-unvisited"}));
            return newArr;

        case "CHANGE_MARKER_STATUS":
            const idArray = state.map(x=>{
                let array = [];
                return array = [...array, x.id];
            });
            const index = idArray.flat().indexOf(action.payload.id);
            const newMarker = {...action.payload, status: action.status};
            const newState = [...state.slice(0, index), newMarker, ...state.slice(index+1, state.length+1)];
            return newState;

        case "CHANGE_ALL_MARKERS_STATUS":
            let array = [];
            state.forEach(item =>{
                const newMarker = {...item, status: item.status==="marker-selected" ? "marker-visited" : item.status==="marker-visited" ? "marker-visited" : action.status};
                array.push(newMarker);
              });
            return array;

        case "APPLY_FILTER_REQUEST":
            return state;

        case "SELECT_FILTER_REQUEST":
                return state;

        default:
            return state;
    }
};

export default mapMarkerReducer;