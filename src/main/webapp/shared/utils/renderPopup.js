import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

import { map } from "../../components/organisms/map/MapGL";

export const renderPopup = (longitude, latitude, popup) => {
    const addPopup=(el) =>{
        const placeholder = document && document.createElement("div");
        ReactDOM.render(el, placeholder);
    
        new mapboxgl.Popup()
            .setDOMContent(placeholder)
            .setLngLat([ longitude, latitude ])
            .setMaxWidth("100%")
            .addTo(map);
    };
    addPopup(popup);
  };