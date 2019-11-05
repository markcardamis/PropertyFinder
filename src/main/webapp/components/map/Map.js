import React from 'react';
import ReactMapGL, {NavigationControl, Marker, Layer, Feature} from 'react-map-gl';
import './Map.css';
import PropertyCard from '../PropertyCard';
import { IoIosPin } from 'react-icons/io';


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            viewport: {
                width: '100%',
                height: '100vh',
                latitude: -33.865143,
                longitude: 151.209900,
                zoom: 13
            }, 
            property1: {
              latitude: -33.861012,
              longitude: 151.215075,
            }, 
            property2: {
              latitude: -33.88183,
              longitude: 151.227008,
            }, 
            property3: {
              latitude: -33.875491,
              longitude: 151.215855,
            }
        }
    }
  
    render() {
      return (
        <div>
          <ReactMapGL 
                className='map row col-lg-12 col-xl-12' 
                mapStyle='mapbox://styles/mapbox/outdoors-v10'
                {...this.state.viewport} 
                onViewportChange={(viewport => this.setState({viewport}))} 
                mapboxApiAccessToken='pk.eyJ1IjoiaXJhcGFsaXkiLCJhIjoiY2syZXY3ZThuMDNldDNjcWszYmF3MGVjbiJ9.XZbadn1EL3fhX47KSbcVzA'>
                  <NavigationControl className='navigationControl'/>
                  <Marker 
                    className='propertyMarker'
                    latitude={this.state.property1.latitude}
                    longitude={this.state.property1.longitude}
                  >
                    <IoIosPin className='propertyMarkerPin'/>
                  </Marker>
          </ReactMapGL>
          <PropertyCard className='propertyCardInformation'/>
        </div>
      )
    }
  }
  export default Map;
