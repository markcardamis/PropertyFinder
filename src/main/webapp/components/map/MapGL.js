import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { IoIosPin } from 'react-icons/io';


import {MAPBOX_API, MAPBOX_STYLE, INITIAL_VIEWPORT} from '../../shared/constants';
import './MapGL.css';
 
    mapboxgl.accessToken = MAPBOX_API;
    let map;
 
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
}

renderMarkers = async () => {
    await this.callApi('/api/listing', null, 'MARKERS')
    const { mapMarker } = this.props.mapGL;

    mapMarker.forEach((marker) => {
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
                const api = `/api/propertyinformation/${propid}`;
                const auth = {headers: {Authorization: 'Bearer ' + await this.props.auth.getAccessToken()}};
                this.callApi(api, auth, 'SHOW_PROPERTY');
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
        console.log('User not found')
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
