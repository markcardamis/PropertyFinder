import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { hotjar } from 'react-hotjar';

import { INITIAL_VIEWPORT, MAPBOX_API, MAPBOX_STYLE } from '../../../shared/constants';
import './MapGL.scss';
import {Logo, MapMarker} from '../../../assets/icons';
import Popup from '../../organisms/popup/Popup';
import { points } from '../../../../../../contsants_temp';
import FilterButtonGroup from '../../molecules/filterButtonGroup/FilterButtonGroup';
import * as MarkerActionCreators from '../../../store/actions/mapMarkerAction';

    mapboxgl.accessToken = MAPBOX_API;
    let map;
    let currentMarkers = [];
 
class MapGL extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = props
        this.state = {
             authenticated: null
        };
        this.boundActionCreators = bindActionCreators(MarkerActionCreators, dispatch)
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
    await this.callApi('/api/listing', null, 'MARKERS');
    const mp = <div><MapMarker/></div>
    this.renderMarkers(mp);

    map.on('click', (e) => this.handlePropertyClick(e)); 
    map.on('move', () => this.handleViewportChange());
    hotjar.initialize(1445331, 6);
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
    this.props.dispatch ({
        type: 'VIEWPORT_CHANGE', 
        payload: {latitude: map.getCenter().lat, longitude: map.getCenter().lng}
      });
}

renderPopup = (e) => {
        const {propertyId, houseNumber, streetName, suburbName, postCode, zoneCode, area, floorSpaceRatio, minimumLotSize, buildingHeight, baseDate1, baseDate2, baseDate3, baseDate4, baseDate5, baseDate0, landValue1, landValue2, landValue3, landValue4, landValue5, landValue0} = this.props.mapGL.showPopup;
        const chartData={
            baseDate: [baseDate5, baseDate4, baseDate3, baseDate2, baseDate1, baseDate0],
            landValue: [landValue5, landValue4, landValue3, landValue2, landValue1, landValue0]
        }

        const propertyInfo = {propertyId, houseNumber, streetName, suburbName, postCode, zoneCode, area, floorSpaceRatio, minimumLotSize, buildingHeight, landValue1}
        const popup = <Popup chartData={chartData} propertyInfo={propertyInfo}/>
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
    const { mapMarker } = this.props.mapGL;
    console.log(mapMarker)
    mapMarker.forEach((marker) => {
        var el = document.createElement('div');
        el.tabIndex = 0;
        el.className = marker.status
        el.onmouseover=()=>el.id='marker-hovered'
        el.onmouseout=()=>el.removeAttribute('id')
        el.onclick=()=>{
            this.callApi(`/api/listing/${marker.id}`, null, 'SHOW_PROPERTY');
            // this.props.dispatch({type: 'SHOW_PROPERTY', payload: marker});
            this.props.dispatch({type: 'CHANGE_ALL_MARKERS_STATUS', status: marker.status==='marker-selected' ? 'marker-visited' : 'marker-unvisited'})
            this.props.dispatch({type: 'CHANGE_MARKER_STATUS', payload: marker, status: 'marker-selected'})
        }
        
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

     if (displayFeatures.length > 0) {
         displayFeatures.map(async (property) => {
             if (property.properties && property.properties.propid) {
                 let propid = property.properties.propid;
                 const api = `/api/propertyinformation/${propid}`;
                 await this.callApi(api, null, 'SHOW_POPUP');
                this.renderPopup(e);
             }            
         });
     }
}

callApi = async (api, auth, action) => { 
    this.props.dispatch({type: 'SHOW_LOADING'});
    try {
        const response = await fetch(api, auth);
        const data = await response.json();
        this.props.dispatch({type: action, payload: data});

    } catch (err) {
        console.log('Api call failed');
        // add notification
    }  
    this.props.dispatch({type: 'HIDE_LOADING'});
}

checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }
 
    render() {
        const {searchModal, showFilter, showSaveModal} = this.props.mapGL
       
    return (
        <div>
            <div   
                ref={el => this.mapContainer = el} 
                className='mapContainer' 
                id='map' 
                style={{left: searchModal ? '45%' : 0}}
                >
                {!showFilter && !showSaveModal && <FilterButtonGroup 
                    onMenuClick={()=>this.props.dispatch({type: searchModal ? 'CLOSE_SEARCH_MODAL' : 'SHOW_SEARCH_MODAL'})}
                    onFilterClick = {()=>this.props.dispatch({type: showFilter ? 'CLOSE_FILTER' : 'SHOW_FILTER'})}
            />}
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mapGL: state
    };
};

export default withAuth(connect(mapStateToProps)(MapGL));
