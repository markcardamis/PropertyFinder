import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';


import {MAPBOX_API, MAPBOX_STYLE, INITIAL_VIEWPORT} from '../../shared/constants';
import './MapGL.css';
 
    mapboxgl.accessToken = MAPBOX_API;
    let map;
 
class MapGL extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             authenticated: null
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
    map.on('click', (e)=>this.handleClick(e));
    this.checkAuthentication();
}


handleClick = (e) => {
    let features = map.queryRenderedFeatures(e.point);
    let displayProperties = ['properties'];

    let displayFeatures = features.map(function(feat) {
        let displayFeat = {};
        displayFeat[displayProperties]=feat[displayProperties];
        return displayFeat;
        });

    if (displayFeatures.length > 0) {
        displayFeatures.map(property => {
            if (property.properties && property.properties.propid && this.state.authenticated) {
                let propid = property.properties.propid; 
                this.callApi();
            }            
        });
    }
}

callApi = async () => {   
    try {
        const response = await fetch(`/api/propertyinformation/${propid}`, {
            headers: {
                Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
              }
        });
        const data = await response.json();
        this.props.dispatch({type: 'SHOW_PROPERTY', payload: data});

    } catch (err) {
        console.log('error api')
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
