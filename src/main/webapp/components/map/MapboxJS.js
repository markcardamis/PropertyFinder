import React from 'react';
import {MAPBOX_API, MAPBOX_STYLE} from '../../shared/constants';
import mapboxgl from 'mapbox-gl';
import './MapboxJS.css';

mapboxgl.accessToken = MAPBOX_API;
let map;

export default class MapboxJS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 151.018731,
            lat: -33.863823,
            zoom: 10
            };
        }

componentDidMount() {
    map = new mapboxgl.Map({
        container: this.mapContainer,
        style: MAPBOX_STYLE,
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom
    });
    map.addControl(new mapboxgl.NavigationControl());
}

showInfo = (e) => {
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
        displayFeatures.map(property => {
            if (property.properties.propid) {
                let result = {propid: property.properties.propid};     
                console.log(result)
            }            
        });
     }
}

render () {
    return (
        <div>
            <div ref={el => this.mapContainer = el} className="mapContainer" onClick={this.showInfo}/>
        </div>
    );
}
}
