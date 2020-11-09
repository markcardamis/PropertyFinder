export const login = (data) => {
    return {
        type: "LOGIN",
        data
    };
};

export const logout = (data) => {
    return {
        type: "LOGOUT",
        data
    };
};