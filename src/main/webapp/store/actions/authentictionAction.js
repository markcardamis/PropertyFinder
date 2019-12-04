export const authenticated = () => {
    return {
        type: 'AUTHENTICATED'
    };
};

export const notAuthenticated = () => {
    return {
        type: 'NOT_AUTHENTICATED'
    };
};