export const showSaveModal = () => {
    return {
        type: "SHOW_SAVE_MODAL"
    };
};

export const closeSaveModal = () => {
    return {
        type: "CLOSE_SAVE_MODAL"
    };
};

export const saveNotification = (name, frequency) => {
    return {
        type: "SAVE_NOTIFICATION", 
        name,
        frequency
    };
};
