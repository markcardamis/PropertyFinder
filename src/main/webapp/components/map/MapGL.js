import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import {MAPBOX_API, MAPBOX_STYLE, INITIAL_VIEWPORT} from '../../shared/constants';
import './MapGL.css';
 
    mapboxgl.accessToken = MAPBOX_API;
 
export default class MapGL extends React.Component {
 
componentDidMount() {
    const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: MAPBOX_STYLE,
        center: [INITIAL_VIEWPORT.longitude, INITIAL_VIEWPORT.latitude],
        zoom: INITIAL_VIEWPORT.zoom
        });
    map.addControl(new mapboxgl.NavigationControl());

    map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point);
        var displayProperties = ['properties'];
        
        var displayFeatures = features.map(function(feat) {
        var displayFeat = {};
        displayProperties.forEach(function(prop) {
            displayFeat[prop] = feat[prop];
            });
            return displayFeat;
            });

        if (displayFeatures.length > 0) {
            displayFeatures.map(property => {
                if (property.properties && property.properties.propid) {
                    let result = {propid: property.properties.propid};     
                    console.log(result);
                }            
            });
        }
        });
    }
 
    render() {
    return (
        <div>
            <div ref={el => this.mapContainer = el} className='mapContainer' id='map'/>
        </div>
        );
    }
}