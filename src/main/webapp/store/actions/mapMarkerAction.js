export const mapMarker = (item) => {
    return {
        type: 'MAP_MARKER',
        payload: item
    };
};

export const changeMarker = (item, status) => {
    return {
        type: 'CHANGE_MARKER',
        payload: item,
        status
    };
};

export const changeAllMarkers = (status) => {
    return {
        type: 'CHANGE_ALL_MARKERS_STATUS',
        status
    };
};


