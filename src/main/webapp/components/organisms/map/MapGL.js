import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { hotjar } from 'react-hotjar';

import { INITIAL_VIEWPORT, MAPBOX_API, MAPBOX_STYLE } from '../../../shared/constants';
import './MapGL.scss';
import {Logo, MapMarker} from '../../../assets/icons';
import Popup from '../../organisms/popup/Popup';
import FilterButtonGroup from '../../molecules/filterButtonGroup/FilterButtonGroup';
import { getPropertyInfo } from '../../../store/actions/propertyModalAction';
import {getMapMarkers} from '../../../store/actions/mapMarkerAction';
import {showFilter, closeFilter} from '../../../store/actions/filterModalAction'
import {showSearchModal, closeSearchModal} from '../../../store/actions/searchModalAction';
import {getPopup} from '../../../store/actions/popupAction';
import {closeLayersModal, showLayersModal} from '../../../store/actions/layersAction'
import LayerSelectModal from '../layerSelectModal/LayerSelectModal';

    mapboxgl.accessToken = MAPBOX_API;
    export let map;
    let currentMarkers = [];
 
class MapGL extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = props
        this.state = {
             authenticated: null
        };
    }
    
    
async componentDidMount() {
    map = new mapboxgl.Map({
        container: this.mapContainer,
        style: MAPBOX_STYLE,
        center: [INITIAL_VIEWPORT.longitude, INITIAL_VIEWPORT.latitude],
        zoom: INITIAL_VIEWPORT.zoom
        });  
 
    map.addControl(new mapboxgl.NavigationControl());
    this.checkAuthentication();
    await this.props.getMapMarkers(this.renderMarkers);

    map.on('click', (e) => this.handlePropertyClick(e)); 
    map.on('move', () => this.handleViewportChange());
    map.on('click', (e) => this.handleHoverLayer(e));
    hotjar.initialize(1445331, 6);
    map.on('styledata', () => {
        map.setLayoutProperty('land-zoning', 'visibility', this.props.layers.landZoning ? 'visible' : 'none');
        map.setLayoutProperty('floor-space-ratio', 'visibility', this.props.layers.floorSpaceRatio ? 'visible' : 'none');
        map.setLayoutProperty('height-of-building', 'visibility', this.props.layers.heightOfBuilding ? 'visible' : 'none');
        map.setLayoutProperty('heritage', 'visibility', this.props.layers.heritage ? 'visible' : 'none');
        map.setLayoutProperty('mobile-internet', 'visibility', this.props.layers.mobileInternet ? 'visible' : 'none');
    });
    
}

componentDidUpdate() {
    if (currentMarkers!==null) {
        for (var i = currentMarkers.length - 1; i >= 0; i--) {
          currentMarkers[i].remove();
        }
    }
    currentMarkers = [];
    const mp = <div><MapMarker/></div>
    this.renderMarkers(mp);   
}

handleViewportChange = () => {
    // this.props.dispatch ({
    //     type: 'VIEWPORT_CHANGE', 
    //     payload: {latitude: map.getCenter().lat, longitude: map.getCenter().lng}
    //   });
}

renderPopup = (e) => {
        const {base_date_1, base_date_2, base_date_3, base_date_4, base_date_5, base_date_0, land_value_1, land_value_2, land_value_3, land_value_4, land_value_5, land_value_0, property_sales} = this.props.popup;
        const chartData={
            baseDate: [base_date_5, base_date_4, base_date_3, base_date_2, base_date_1, base_date_0],
            landValue: [land_value_5, land_value_4, land_value_3, land_value_2, land_value_1, land_value_0]
        }
        
        const popup = <Popup chartData={chartData} salesData={property_sales} propertyInfo={this.props.popup}/>
        const propertyData = <div>{popup}</div>

        const addPopup=(el) =>{
            const placeholder = document.createElement('div');
            ReactDOM.render(el, placeholder);
        
            const marker = new mapboxgl.Popup()
                .setDOMContent(placeholder)
                .setLngLat([e.lngLat.wrap().lng, e.lngLat.wrap().lat])
                //.setMaxWidth("354px")
                .setMaxWidth("100%")
                .addTo(map);
        }
        addPopup(propertyData)
}

renderMarkers = async () => {
    const { mapMarker } = this.props;
    mapMarker.forEach((marker) => {
        var el = document.createElement('div');
        el.tabIndex = 0;
        el.className = marker.status
        el.onmouseover=()=>el.id='marker-hovered'
        el.onmouseout=()=>el.removeAttribute('id')
        el.onclick=()=>this.props.getPropertyInfo(marker)
       
        let oneMarker = new mapboxgl.Marker(el)
          .setLngLat({lng: marker.longitude, lat: marker.latitude})
          .addTo(map)
        currentMarkers.push(oneMarker);
    })
}

handlePropertyClick = async (e) => {
     let features = map.queryRenderedFeatures(e.point);
     let displayProperties = ['properties']
     let displayFeatures = features.map(function(feat) {
         let displayFeat = {};
         displayFeat[displayProperties]=feat[displayProperties];
         return displayFeat;
         });
    if (displayFeatures[0].properties && displayFeatures[0].properties.propid) {
        let propid = displayFeatures[0].properties.propid;
        this.props.getPopup(propid, e, this.renderPopup);
    }
}

handleHoverLayer = (e) => {
    let features = map.queryRenderedFeatures(e.point);

        let displayProperties = ['properties'];

        let displayFeatures = features.map(function(feat) {
            let displayFeat = {};
            displayProperties.forEach(function(prop) {
                displayFeat[prop] = feat[prop];
            });
            return displayFeat;
        });

        if (displayFeatures.length > 0) {
            displayFeatures.map(async (property) => {
                if (property.properties && property.properties.MAP_TYPE) {
                    let info;
                    switch(property.properties.MAP_TYPE) {
                        case 'LZN':
                            info = property.properties.SYM_CODE;
                            break;
                        case 'LSZ':
                            info = property.properties.LOT_SIZE + property.properties.UNITS;
                            break;
                        case 'FSR':
                            info = property.properties.FSR;
                            break;
                        case 'HOB':
                            info = property.properties.MAX_B_H + property.properties.UNITS;
                            break;
                        case 'HER':
                            info = property.properties.H_NAME + property.properties.UNITS;
                            break;
                        default:
                        }
                    let layerInfoPopup = new mapboxgl.Popup({ closeOnClick: true })
                        .setLngLat([e.lngLat.wrap().lng, e.lngLat.wrap().lat])
                        .setHTML(`<br/><p>${info}</p>`)
                        .addTo(map);
                }
            });
        }
}

checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }
 
    render() {
        const {searchModal, filterModal, saveModal, layers} = this.props
    return (
            <div   
                ref={el => this.mapContainer = el} 
                className='mapContainer' 
                id='map' 
                style={{left: searchModal ? '45%' : 0}}
                >
                {!filterModal && !saveModal && <FilterButtonGroup 
                    onMenuClick={()=> searchModal ? this.props.closeSearchModal() : this.props.showSearchModal()}
                    onFilterClick = {()=> filterModal ? this.props.closeFilter() : this.props.showFilter()}
                    onLayersClick = {()=> layers.showModal ? this.props.closeLayersModal() : this.props.showLayersModal()}
                />}
                {layers.showModal&&<LayerSelectModal/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mapGL: state,
        mapMarker: state.mapMarker,
        searchModal: state.searchModal,
        filterModal: state.filterModal,
        saveModal: state.saveModal,
        popup: state.popup,
        layers: state.layers
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
    closeLayersModal
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(MapGL));
