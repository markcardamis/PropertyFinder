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
 
    mapboxgl.accessToken = MAPBOX_API;
    let map;
    let currentMarkers = [];
 
class MapGL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             authenticated: null,
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
        const {propertyId, houseNumber, streetName, suburbName, postCode, zoneCode, area, floorSpaceRatio, minimumLotSize, buildingHeight, baseDate1, baseDate2, baseDate3, baseDate4, baseDate5, landValue1, landValue2, landValue3, landValue4, landValue5} = this.props.mapGL.showPopup;
        const chartData={
            baseDate: [baseDate5, baseDate4, baseDate3, baseDate2, baseDate1],
            landValue: [landValue5, landValue4, landValue3, landValue2, landValue1]
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
                .setMaxWidth("354px")
                .addTo(map);
        }
        addPopup(propertyData)
}



renderMarkers = async (mp) => {
    const { mapMarker } = this.props.mapGL;
    mapMarker.forEach((marker) => {
        var el = document.createElement('div');
        el.className = 'marker';
        el.tabIndex = 0;
        
        let oneMarker = new mapboxgl.Marker(el)
          .setLngLat({lng: marker.longitude, lat: marker.latitude})
          .addTo(map);
        el.addEventListener('click', () => {
            this.handleMarkerClick(marker);
        });
        currentMarkers.push(oneMarker);
      });
}

handleMarkerClick = (marker) => {
    this.callApi(`/api/listing/${marker.id}`, null, 'SHOW_PROPERTY');
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
    return (
        <div>
            {/* {console.log(this.props.mapGL.showLoading)} */}
            <div ref={el => this.mapContainer = el} className='mapContainer' id='map'/>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mapGL: state,
    };
};

export default withAuth(connect(mapStateToProps)(MapGL));
