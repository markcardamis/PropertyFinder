import React from "react";
import { withAuth } from "@okta/okta-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { hotjar } from "react-hotjar";
import { connect } from "react-redux";

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

    mapboxgl.accessToken = process.env.MAPBOX_API;
    export let map;
    let currentMarkers = [];
    let hoverId = null;
 
class MapGL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             authenticated: null
        };
    }
    
async componentDidMount() {
    map = new mapboxgl.Map({
        container: this.mapContainer,
        style: process.env.MAPBOX_STYLE,
        center: [ INITIAL_VIEWPORT.longitude, INITIAL_VIEWPORT.latitude ],
        zoom: INITIAL_VIEWPORT.zoom
        });  
 
    map.addControl(new mapboxgl.NavigationControl());
    this.checkAuthentication();
    await this.props.getMapMarkers(this.renderMarkers);

    if ((process.env.LOGGING || "").trim() === "production") {
        hotjar.initialize(1445331, 6);
    }
    
    // map.on("click", (e) => this.handlePropertyClick(e)); 
    map.on("click", (e) => console.log("clicked property")); 
    map.on("move", () => this.handleViewportChange());
    map.on("mousemove", "nsw-property", (e) => this.handleHoverOnProperty(e));
    map.on("mouseleave", "nsw-property", () => this.handleHoverOffProperty());
    map.on("styledata", () => {
        map.setLayoutProperty("nswlandzoning", "visibility", this.props.layers.landZoning ? "visible" : "none");
        map.setLayoutProperty("nswlandzoning-labels", "visibility", this.props.layers.landZoning ? "visible" : "none");
        map.setLayoutProperty("nswfloorspaceratio", "visibility", this.props.layers.floorSpaceRatio ? "visible" : "none");
        map.setLayoutProperty("nswfloorspaceratio-labels", "visibility", this.props.layers.floorSpaceRatio ? "visible" : "none");
        map.setLayoutProperty("nswheightofbuilding", "visibility", this.props.layers.heightOfBuilding ? "visible" : "none");
        map.setLayoutProperty("nswheightofbuilding-labels", "visibility", this.props.layers.heightOfBuilding ? "visible" : "none");
        map.setLayoutProperty("nswlotsize", "visibility", this.props.layers.lotsize ? "visible" : "none");
        map.setLayoutProperty("nswlotsize-labels", "visibility", this.props.layers.lotsize ? "visible" : "none");
        map.setLayoutProperty("nswheritage", "visibility", this.props.layers.heritage ? "visible" : "none");
        map.setLayoutProperty("nswheritage-labels", "visibility", this.props.layers.heritage ? "visible" : "none");
        map.setLayoutProperty("mobile-internet", "visibility", this.props.layers.mobileInternet ? "visible" : "none");
    });

}

componentDidUpdate() {
    if (currentMarkers!==null) {
        for (var i = currentMarkers.length - 1; i >= 0; i--) {
          currentMarkers[i].remove();
        }
    }
    currentMarkers = [];
    this.renderMarkers(); 
}

handleViewportChange = () => {
    this.props.showSearchArea();
    this.props.viewportChange({ latitude: map.getCenter().lat, longitude: map.getCenter().lng });
    this.handleRemoveParcels();
}

renderMarkers = async () => {
    const { markers, nearbyDAMarkers } = this.props.mapMarker;
    markers.forEach((marker) => {
        const el = document.createElement("div");
        el.tabIndex = 0;
        el.className = marker.status;
        el.onmouseover=()=>el.id="marker-hovered";
        el.onmouseout=()=>el.removeAttribute("id");
        el.onclick=()=>this.props.getPropertyInfo(marker);
       
        const oneMarker = new mapboxgl.Marker(el)
          .setLngLat({ lng: marker.longitude, lat: marker.latitude })
          .addTo(map);
        currentMarkers.push(oneMarker);
    });

    nearbyDAMarkers.forEach((marker) => {
        const el = document.createElement("div");
        el.tabIndex = 0;
        el.className = "marker-nearbyDA";
        el.onclick=(e)=>{
            e.stopPropagation(); 
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

handlePropertyClick = async (e) => {
    let features = map.queryRenderedFeatures(e.point);
    let displayProperties = [ "properties" ];
    let displayFeatures = features.map(function(feat) {
         let displayFeat = {};
         displayFeat[displayProperties]=feat[displayProperties];
         return displayFeat;
         });
    if (displayFeatures[0].properties && displayFeatures[0].properties.propid) {
        let propid = displayFeatures[0].properties.propid;
        this.props.getPopup(propid, e.lngLat.wrap().lng, e.lngLat.wrap().lat);
    }
}

handleHoverOnProperty = (e) => {
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

handleHoverOffProperty = () => {
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

handleRemoveParcels = () => {
    map.setFilter("nsw-property-highlighted", [ "in", "propid", "" ]);
}

checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }
 
    render() {
        const { searchModal, filterModal, saveModal, layers } = this.props;
    return (
        <>
            <div   
                ref={el => this.mapContainer = el} 
                className="mapContainer"
                id="map"
                style={{ left: searchModal ? "45%" : 0, width: searchModal ? "55%" : "100%" }}
                >
                {!filterModal && !saveModal && <FilterButtonGroup 
                    onListViewClick={()=> this.props.showSearchModal()}
                    onMapViewClick={()=> this.props.closeSearchModal()}
                    onFilterClick = {()=> filterModal ? this.props.closeFilter() : this.props.showFilter()}
                    onLayersClick = {()=> layers.showModal ? this.props.closeLayersModal() : this.props.showLayersModal()}
                />}
                {layers.showModal&&<LayerSelectModal/>}
            </div>
            <div id="map-overlay" className="map-overlay"/>
        </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mapGL: state,
        mapMarker: state.mapMarker,
        searchModal: state.searchModal,
        filterModal: state.filterModal,
        saveModal: state.saveModal.showModal,
        popup: state.popup,
        layers: state.layers,
        parcels: state.parcelSearch.result
    };
};
const mapDispatchToProps = {
    getMapMarkers,
    getPropertyInfo,
    showFilter,
    closeFilter,
    showSearchModal,
    closeSearchModal,
    getPopup,
    showLayersModal,
    closeLayersModal,
    viewportChange,
    showSearchArea
};

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(MapGL));
