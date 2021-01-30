import { nearbyDA, points } from "../../../../../constants_temp";

const mapMarkerReducer = (state = { markers: [], nearbyDAMarkers: [] }, action) => {
//    const mapMarkerReducer = (state = { markers: points, nearbyDAMarkers: [] }, action) => {
    switch (action.type) {
        case "SET_MAP_MARKERS_REQUEST":
            return state;

        case "SET_MAP_MARKERS_LOADED":
            const newArr = action.markers.map(v => ({ ...v, status: "marker-unvisited" }));
            return ({
                    markers: newArr,
                    nearbyDAMarkers: action.payload.nearbyDAMarkers
            });

        case "CHANGE_MARKER_STATUS":
            const idArray = state.markers.map(x=>{
                let array = [];
                return array = [ ...array, x.id ];
            });
            const index = idArray.flat().indexOf(action.payload.id);
            const newMarker = { ...action.payload, status: action.status };
            const newState = [ ...state.markers.slice(0, index), newMarker, ...state.markers.slice(index + 1, state.markers.length + 1) ];
            return ({
                markers: newState,
                nearbyDAMarkers: state.nearbyDAMarkers
            });

        case "CHANGE_ALL_MARKERS_STATUS":
            let array = [];
            state.markers.forEach(item =>{
                const newMarker = { ...item, status: item.status==="marker-selected" ? "marker-visited" : item.status==="marker-visited" ? "marker-visited" : action.status };
                array.push(newMarker);
              });
            return ({
                markers: array,
                nearbyDAMarkers: state.nearbyDAMarkers
            });

        case "APPLY_FILTER_REQUEST":
            return state;

        case "SELECT_FILTER_REQUEST":
                return state;

        default:
            return state;
    }
};

export default mapMarkerReducer;