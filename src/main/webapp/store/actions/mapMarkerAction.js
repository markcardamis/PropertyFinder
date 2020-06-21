export const mapMarker = (item) => {
    return {
        type: 'MAP_MARKER',
        payload: item
    };
};

export const changeMarker = (item, isActive) => {
    return {
        type: 'MAP_MARKER',
        payload: item,
        isActive
    };
};

