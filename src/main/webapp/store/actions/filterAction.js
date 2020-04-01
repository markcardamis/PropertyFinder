export const filter = (item) => {
    return {
        type: 'FILTER',
        payload: item
    };
};