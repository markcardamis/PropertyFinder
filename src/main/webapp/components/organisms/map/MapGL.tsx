import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { hotjar } from "react-hotjar";
import { useDispatch, useSelector } from "react-redux";

import { INITIAL_VIEWPORT } from "../../../shared/constants/constants";
import { closeFilter, showFilter } from "../../../store/actions/filterModalAction";
import { closeLayersModal, showLayersModal } from "../../../store/actions/layersAction";
import { getMapMarkers } from "../../../store/actions/mapMarkerAction";
import { getPopup } from "../../../store/actions/popupAction";
import { getPropertyInfo } from "../../../store/actions/propertyModalAction";
import { closeSearchModal, showSearchModal } from "../../../store/actions/searchModalAction";
import { viewportChange } from "../../../store/actions/viewportAction";
import FilterButtonGroup from "../../molecules/filterButtonGroup/FilterButtonGroup";
import LayerSelectModal from "../layerSelectModal/LayerSelectModal";
import "./MapGL.scss";
import { showSearchArea } from "../../../store/actions/searchAreaBtnAction";
import { renderPopup } from "../../../shared/utils/renderPopup";
import { NearByPopup } from "../../molecules/nearByPopup/NearByPopup";
import { removeMapPopup } from "../../../shared/utils/removeMapPopup";

    mapboxgl.accessToken = process.env.MAPBOX_API;
    export let map;
    let currentMarkers = [];
    let hoverId = null;
 
const MapGL = () => {
    const dispatch = useDispatch();
    const { searchModal, filterModal, saveModal, layers, mapMarker } = useSelector(state=>state);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: process.env.MAPBOX_STYLE,
            center: [ INITIAL_VIEWPORT.longitude, INITIAL_VIEWPORT.latitude ],
            zoom: INITIAL_VIEWPORT.zoom
            });  
     
        map.addControl(new mapboxgl.NavigationControl());
        dispatch(getMapMarkers(renderMarkers));

        if ((process.env.LOGGING || "").trim() === "production") {
            hotjar.initialize(1445331, 6);
        }
        map.on("click", (e) => handlePropertyClick(e)); 
        map.on("move", () => handleViewportChange());
        map.on("mousemove", "nsw-property", (e) => handleHoverOnProperty(e));
        map.on("mouseleave", "nsw-property", () => handleHoverOffProperty());
        map.on("styledata", () => {
            map.setLayoutProperty("nswlandzoning", "visibility", layers.landZoning ? "visible" : "none");
            map.setLayoutProperty("nswlandzoning-labels", "visibility", layers.landZoning ? "visible" : "none");
            map.setLayoutProperty("nswfloorspaceratio", "visibility", layers.floorSpaceRatio ? "visible" : "none");
            map.setLayoutProperty("nswfloorspaceratio-labels", "visibility", layers.floorSpaceRatio ? "visible" : "none");
            map.setLayoutProperty("nswheightofbuilding", "visibility", layers.heightOfBuilding ? "visible" : "none");
            map.setLayoutProperty("nswheightofbuilding-labels", "visibility", layers.heightOfBuilding ? "visible" : "none");
            map.setLayoutProperty("nswlotsize", "visibility", layers.lotsize ? "visible" : "none");
            map.setLayoutProperty("nswlotsize-labels", "visibility", layers.lotsize ? "visible" : "none");
            map.setLayoutProperty("nswheritage", "visibility", layers.heritage ? "visible" : "none");
            map.setLayoutProperty("nswheritage-labels", "visibility", layers.heritage ? "visible" : "none");
            map.setLayoutProperty("mobile-internet", "visibility", layers.mobileInternet ? "visible" : "none");
        });
    }, [])

    

useEffect(() => {
        if (currentMarkers!==null) {
            for (let i = currentMarkers.length - 1; i >= 0; i--) {
              currentMarkers[i].remove();
            }
        }
        currentMarkers = [];
        renderMarkers(); 
}, [currentMarkers])

const handleViewportChange = () => {
    dispatch(showSearchArea());
    dispatch(viewportChange({ latitude: map.getCenter().lat, longitude: map.getCenter().lng }));
}

const renderMarkers = async () => {
    const { markers, nearbyDAMarkers } = mapMarker;
    markers.forEach((marker) => {
        const el = document && document.createElement("div");
        el.tabIndex = 0;
        el.className = marker.status;
        el.onmouseover=()=>el.id="marker-hovered";
        el.onmouseout=()=>el.removeAttribute("id");
        el.onclick=()=> dispatch(getPropertyInfo(marker));
       
        const oneMarker = new mapboxgl.Marker(el)
          .setLngLat({ lng: marker.longitude, lat: marker.latitude })
          .addTo(map);
        currentMarkers.push(oneMarker);
    });

    nearbyDAMarkers.forEach((marker) => {
        const el = document && document.createElement("div");
        el.tabIndex = 0;
        el.className = "marker-nearbyDA";
        el.onclick=(e)=>{
            e.stopPropagation();
            removeMapPopup(); 
            renderPopup(
                marker.application.lng, 
                marker.application.lat, 
                <NearByPopup 
                    title={marker.application.address}
                    url={marker.application.info_url}
                    date={marker.application.date_received}
                    description={marker.application.description}
                    />
            );};
        const oneMarker = new mapboxgl.Marker(el)
          .setLngLat({ lng: marker.application.lng, lat: marker.application.lat })
          .addTo(map);
        currentMarkers.push(oneMarker);
    });
}

const handlePropertyClick = async (e) => {
    const features = map.queryRenderedFeatures(e.point);
    const displayProperties = [ "properties" ];
    const displayFeatures = features.map(function(feat) {
         const displayFeat = {};
         displayFeat[displayProperties]=feat[displayProperties];
         return displayFeat;
         });
    if (displayFeatures[0].properties && displayFeatures[0].properties.propid) {
        let propid = displayFeatures[0].properties.propid;
        dispatch(getPopup(propid, e.lngLat.wrap().lng, e.lngLat.wrap().lat));
    }
}

const handleHoverOnProperty = (e) => {
    if (e.features.length > 0) {
        if (hoverId) {
            map.setFeatureState({
                source: "composite",
                sourceLayer: "nsw_property",
                id: hoverId,
                }, {
                hover: false
            });
        }
        hoverId = e.features[0].id;
        map.setFeatureState({
            source: "composite",
            sourceLayer: "nsw_property",
            id: hoverId,
            }, {
            hover: true
        });
    }
}

const handleHoverOffProperty = () => {
    if (hoverId) {
        map.setFeatureState({
            source: "composite",
            sourceLayer: "nsw_property",
            id: hoverId,
            }, {
            hover: false
        });
    }
    hoverId = null;
}

    return (
        <>
            <div   
                ref={mapContainerRef} 
                className="mapContainer"
                id="map"
                style={{ left: searchModal ? "45%" : 0, width: searchModal ? "55%" : "100%" }}
                >
                {!filterModal && !saveModal.showModal && <FilterButtonGroup 
                    onListViewClick={()=> dispatch(showSearchModal())}
                    onMapViewClick={()=> dispatch(closeSearchModal())}
                    onFilterClick = {()=> filterModal ? dispatch(closeFilter()) : dispatch(showFilter())}
                    onLayersClick = {()=> layers.showModal ? dispatch(closeLayersModal()) : dispatch(showLayersModal())}
                />}
                {layers.showModal && <LayerSelectModal/>}
            </div>
            <div id="map-overlay" className="map-overlay"/>
        </>
        );
}

export default MapGL;
