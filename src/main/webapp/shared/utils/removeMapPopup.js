export const removeMapPopup = () => {
    const popup = document.getElementsByClassName("mapboxgl-popup");
    if ( popup.length ) popup[0].remove();
};