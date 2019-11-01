import React from 'react';
import ReactMapGL from 'react-map-gl';

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            viewport: {
                width: "100vw",
                height: "100vh",
                latitude: -33.865143,
                longitude: 151.209900,
                zoom: 13
            }
        }
    }
  
    render() {
  
      return (
        <div>
          <ReactMapGL 
                className='map' 
                mapStyle='mapbox://styles/mapbox/outdoors-v10'
                {...this.state.viewport} 
                onViewportChange={(viewport => this.setState({viewport}))} 
                mapboxApiAccessToken='pk.eyJ1IjoiaXJhcGFsaXkiLCJhIjoiY2syZXY3ZThuMDNldDNjcWszYmF3MGVjbiJ9.XZbadn1EL3fhX47KSbcVzA'>
          </ReactMapGL>
        </div>
      )
    }
  }
  export default Map;
