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
    const propertyid = {
        "districtCode": 261,
        "districtName": "CUMBERLAND",
        "propertyId": 820871,
        "propertyType": "NORMAL",
        "propertyName": null,
        "unitNumber": null,
        "houseNumber": "282",
        "streetName": "EXCELSIOR ST",
        "suburbName": "GUILDFORD",
        "postCode": "2161",
        "zoneCode": "R2",
        "area": 550.10,
        "areaType": "M",
        "baseDate1": "2018-01-07",
        "landValue1": 565000,
        "authority1": "14A(1)",
        "basis1": "6A(1)",
        "baseDate2": "2017-01-07",
        "landValue2": 612000,
        "authority2": "14A(1)",
        "basis2": "6A(1)",
        "baseDate3": "2016-01-07",
        "landValue3": 541000,
        "authority3": "14A(1)",
        "basis3": "6A(1)",
        "baseDate4": "2015-01-07",
        "landValue4": 494000,
        "authority4": "14A(1)",
        "basis4": "6A(1)",
        "baseDate5": "2014-01-07",
        "landValue5": 348000,
        "authority5": "14A(1)",
        "basis5": "6A(1)",
        "floorSpaceRatio": 0.50,
        "minimumLotSize": "550",
        "buildingHeight": 9.00
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
        const propertyData = `<h5>Property ID: ${this.props.mapGL.showPopup.propertyId}</h5><div>Address: ${this.props.mapGL.showPopup.address}</div><div>Zone Code: ${this.props.mapGL.showPopup.zoneCode}</div><div>Area: ${this.props.mapGL.showPopup.area}</div><div>Land Value: ${this.props.mapGL.showPopup.landValue1}</div><div>Floor Space Ratio: ${this.props.mapGL.showPopup.floorSpaceRatio}</div><div>Minimum Lot Size: ${this.props.mapGL.showPopup.minimumLotSize}</div><div>Building Height: ${this.props.mapGL.showPopup.buildingHeight}</div>`
        new mapboxgl.Popup()
        .setLngLat([e.lngLat.wrap().lng, e.lngLat.wrap().lat])
        // .setHTML(propertyData.join(''))
        .setHTML(propertyData)
        .addTo(map);
}

renderMarkers = async () => {
    await this.callApi('/api/listing', null, 'MARKERS')
    const { mapMarker } = this.props.mapGL;

    mapMarker.forEach((marker) => {
    //    points.forEach((marker) => { 
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
                this.renderPopup(e)
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
            {console.log(this.props)}
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
