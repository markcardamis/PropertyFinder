export const showLayersModal = () => dispatch => {
    dispatch({
        type: "SHOW_LAYERS_MODAL"
    });
};

export const toggleLayer = (layer) => dispatch => {
    dispatch({
        type: "TOGGLE_LAYER",
        layer
    });
};

export const closeLayersModal = () => dispatch => {
    dispatch({
        type: "CLOSE_LAYERS_MODAL"
    });
};
