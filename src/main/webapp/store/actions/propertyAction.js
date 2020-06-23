export const showProperty = (item) => {
    return {
        type: 'SHOW_PROPERTY',
        payload: item
    };
};

export const closeProperty = () => {
    return {
        type: 'CLOSE_PROPERTY'
    };
};
