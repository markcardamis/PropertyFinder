export const showLayersModal = () => {
    return {
        type: "SHOW_LAYERS_MODAL"
    };
};

export const toggleLayer = (layer) => {
    return {
        type: "TOGGLE_LAYER",
        layer
    };
};

export const closeLayersModal = () => {
    return {
        type: "CLOSE_LAYERS_MODAL"
    };
};
