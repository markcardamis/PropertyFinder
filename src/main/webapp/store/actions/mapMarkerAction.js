export const mapMarker = (item) => {
    return {
        type: 'MAP_MARKER',
        payload: item
    };
};

export const changeMarker = (item, isActive) => {
    return {
        type: 'CHANGE_MARKER',
        payload: item,
        isActive
    };
};

export const changeAllMarkers = (isActive) => {
    return {
        type: 'CHANGE_ALL_MARKERS_STATUS',
        isActive
    };
};


