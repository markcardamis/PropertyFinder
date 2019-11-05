import React from 'react';
import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl';
import './Map.css';

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
                  {/* <Marker 
                    latitude={-33.861012}
                    longitude={151.215054}
                  ><img src='https://image.flaticon.com/icons/svg/67/67347.svg'/>
                  </Marker> */}
          </ReactMapGL>
        </div>
      )
    }
  }
  export default Map;
