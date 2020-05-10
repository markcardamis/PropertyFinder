import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { hotjar } from 'react-hotjar';

import { INITIAL_VIEWPORT, MAPBOX_API, MAPBOX_STYLE } from '../../shared/constants';
import './MapGL.css';
import Popup from '../organisms/popup/Popup';
 
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
    this.renderMarkers();

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
        // const propertyId = 3408300;
        // const houseNumber="11a";
        // const streetName="John Street";
        // const suburbName="GRANVILLE"
        // const postCode="2142"
        // const area=1025
        // const zoneCode="R2"
        // const landValue1="6453522"
        // const floorSpaceRatio = 0.50
        // const minimumLotSize = null
        // const buildingHeight = 4

        // const chartData={
        //     baseDate: ["2014-01-07", "2015-01-07", "2016-01-07", "2017-01-07", '2018-01-07'],
        //     landValue: [1349000, 1495000, 1542000, 1643000, 1594000]
        // }

        const propertyInfo = {propertyId, houseNumber, streetName, suburbName, postCode, zoneCode, area, floorSpaceRatio, minimumLotSize, buildingHeight, landValue1}
        const popup = <Popup chartData={chartData} propertyInfo={propertyInfo}/>
        const propertyData = <div>{popup}</div>

        const addPopup=(el) =>{
            const placeholder = document.createElement('div');
            ReactDOM.render(el, placeholder);
        
            const marker = new mapboxgl.Popup()
                .setDOMContent(placeholder)
                .setLngLat([e.lngLat.wrap().lng, e.lngLat.wrap().lat])
                .addTo(map);
        }
        addPopup(propertyData)
}



renderMarkers = async () => {
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
