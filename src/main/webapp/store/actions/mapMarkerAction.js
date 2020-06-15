export const mapMarker = (item) => {
    return {
        type: 'MAP_MARKER',
        payload: item
    };
};

export const changeMarker = (item, status) => {
    return {
        type: 'MAP_MARKER',
        payload: item,
        status
    };
};

