import React from 'react';
// import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
// import { IoIosPin } from 'react-icons/io';


import { INITIAL_VIEWPORT, MAPBOX_API, MAPBOX_STYLE } from '../../shared/constants';
// import { points, markerInfo, propertyid } from '../../../../../contsants_temp';
import './MapGL.css';
 
    mapboxgl.accessToken = MAPBOX_API;
    let map;
    let currentMarkers = [];
    let oneMarker;
 
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
    this.renderMarkers();

    map.on('mouseover', (e) => this.handlePropertyClick(e)); 
    map.on('move', () => this.handleViewportChange());
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
        //const {propertyId, address, zoneCode, area, landValue1, floorSpaceRatio, minimumLotSize, buildingHeight} = this.props.mapGL.showPopup;
        // const propertyData = [
        //                         propertyId && `<h6>Property ID: ${propertyId}</h6>`,
        //                         address && `<div>Address: ${address}</div>`,
        //                         zoneCode && `<div>Zone Code: ${zoneCode}</div>`,
        //                         area `<div>Area: ${area}</div>`,
        //                         landValue1 && `<div>Land Value: ${landValue1}</div>`,
        //                         floorSpaceRatio && `<div>Floor Space Ratio: ${floorSpaceRatio}</div>`,
        //                         minimumLotSize && `<div>Minimum Lot Size: ${minimumLotSize}</div>`,
        //                         buildingHeight && `<div>Building Height: ${buildingHeight}</div>`
        //                     ]
        const propertyData = `<h5>Property ID: ${this.props.mapGL.showPopup.propertyId}</h5><div>Address: ${this.props.mapGL.showPopup.address}</div><div>Zone Code: ${this.props.mapGL.showPopup.zoneCode}</div><div>Area: ${this.props.mapGL.showPopup.area}</div><div>Land Value: ${this.props.mapGL.showPopup.landValue1}</div><div>Floor Space Ratio: ${this.props.mapGL.showPopup.floorSpaceRatio}</div><div>Minimum Lot Size: ${this.props.mapGL.showPopup.minimumLotSize}</div><div>Building Height: ${this.props.mapGL.showPopup.buildingHeight}</div>`;
        new mapboxgl.Popup()
        .setLngLat([e.lngLat.wrap().lng, e.lngLat.wrap().lat])
        // .setHTML(propertyData.join(''))
        .setHTML(propertyData)
        .addTo(map);
}

renderMarkers = async () => {
    const { mapMarker } = this.props.mapGL;

    mapMarker.forEach((marker) => {
    // points.forEach((marker) => { 
        var el = document.createElement('div');
        el.className = 'marker';
        el.tabIndex = 0;

        oneMarker = new mapboxgl.Marker(el)
          .setLngLat({lng: marker.longitude, lat: marker.latitude})
          .addTo(map);
        el.addEventListener('click', () => {this.handleMarkerClick(marker)});
      });
}

handleMarkerClick = (marker) => {
    //
//     console.log(marker.id)
//   this.props.dispatch({type: 'SHOW_PROPERTY', payload: markerInfo});

   this.callApi(`/api/listing/${marker.id}`, null, 'SHOW_PROPERTY');
}

handlePropertyClick = async (e) => {
    let features = map.queryRenderedFeatures(e.point);
    let displayProperties = ['properties'];

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
                const auth = {headers: {Authorization: 'Bearer ' + await this.props.auth.getAccessToken()}};
                await this.callApi(api, auth, 'SHOW_POPUP');
                this.renderPopup(e);
            }            
        });
    }
}

callApi = async (api, auth, action) => {   
    try {
        const response = await fetch(api, auth);
        const data = await response.json();
        const { dispatch } = this.props;
        dispatch({type: action, payload: data});

    } catch (err) {
        console.log('Api call failed');
        // add notification
    }  
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
