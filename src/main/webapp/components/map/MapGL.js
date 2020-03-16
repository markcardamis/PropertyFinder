import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { IoIosPin } from 'react-icons/io';


import {MAPBOX_API, MAPBOX_STYLE, INITIAL_VIEWPORT} from '../../shared/constants';
import './MapGL.css';
 
    mapboxgl.accessToken = MAPBOX_API;
    let map;

    const points = [{
        id: 1700344,
        latitude: -33.73167,
        longitude: 151.171982
    },
    {
        id: 1700345,
        latitude: -33.59066,
        longitude: 150.256363
    },
    {
        "id": 1700346,
        "latitude": -33.7234,
        "longitude": 150.447586
    }]

    const markerInfo = {
        "id": 1832596,
        "price": "$199,000 to $220,000",
        "listingURL": "https://www.domain.com.au/16-eastern-avenue-hazelbrook-nsw-2779-2015439865",
        "listingPhoto": "https://bucket-api.domain.com.au/v1/bucket/image/2015439865_1_1_190712_052455-w4032-h3024",
        "address": "16 EASTERN AVENUE HAZELBROOK 2779",
        "unitNumber": "",
        "houseNumber": "16",
        "streetName": "Eastern Avenue",
        "suburbName": "HAZELBROOK",
        "postCode": "2779",
        "area": 1043,
        "bathrooms": null,
        "bedrooms": null,
        "carspaces": null,
        "latitude": -33.7234,
        "longitude": 150.447586,
        "summaryDescription": "this terrific parcel of land is nestled in a cul-de-sac and provides the perfect opportunity for those looking to build their dream home in the mountains. balancing a lovely sense of the surrounding nature and conveniences of nearby lawson...",
        "zone": "E4",
        "floorSpaceRatio": 0.00,
        "minimumLotSize": null,
        "landValue": 201000,
        "pricePSM": 190,
        "priceToLandValue": 1.00
    }
 
class MapGL extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
             authenticated: null,
        }
    }
    
    
componentDidMount() {
    map = new mapboxgl.Map({
        container: this.mapContainer,
        style: MAPBOX_STYLE,
        center: [INITIAL_VIEWPORT.longitude, INITIAL_VIEWPORT.latitude],
        zoom: INITIAL_VIEWPORT.zoom
        });  

    map.addControl(new mapboxgl.NavigationControl());
    this.checkAuthentication();
    this.renderMarkers();

    map.on('click', (e) => this.handlePropertyClick(e)); 
    map.on('click', (e) => this.renderPopup(e));

}


renderPopup = () => {
        // var coordinates = e.features[0].geometry.coordinates.slice();
        // var description = e.features[0].properties.description;
         
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        // coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }
         
        // new mapboxgl.Popup()
        // .setLngLat(coordinates)
        // .setHTML(description)
        // .addTo(map);
        // new mapboxgl.Popup()
        // .setLngLat([150.447586, -33.7234])
        // .setHTML('hello')
        // .addTo(map);
}

renderMarkers = async () => {
    await this.callApi('/api/listing', null, 'MARKERS')
    const { mapMarker } = this.props.mapGL;

    mapMarker.forEach((marker) => {
       // points.forEach((marker) => { 
        var el = document.createElement('div');
        el.className = 'marker';
        el.tabIndex = 0;
    
        new mapboxgl.Marker(el)
          .setLngLat({lng: marker.longitude, lat: marker.latitude})
          .addTo(map);
        el.addEventListener('click', () => {
            this.handleMarkerClick(marker);
        });
      });
}

handleMarkerClick = (marker) => {
    //
    this.props.dispatch({type: 'SHOW_PROPERTY', payload: markerInfo});

   this.callApi(`/api/listing/${marker.id}`, null, 'SHOW_PROPERTY');
}

handlePropertyClick = (e) => {
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
                console.log(propid)
                const api = `/api/propertyinformation/${propid}`;
                const auth = {headers: {Authorization: 'Bearer ' + await this.props.auth.getAccessToken()}};
                this.callApi(api, auth, 'SHOW_POPUP');
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
        console.log('Api call failed')
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
