import React from 'react';
import ReactMapGL, {NavigationControl, Marker, Layer, Feature} from 'react-map-gl';
import './Map.css';
import PropertyCard from '../widgets/PropertyCard';
import { IoIosPin } from 'react-icons/io';


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            viewport: {
                width: '100vw',
                height: '100vh',
                latitude: -33.865143,
                longitude: 151.209900,
                zoom: 13
            }, 
            property: [{
              id: 1,
              latitude: -33.861012,
              longitude: 151.215075,
            }, {
              id: 2,
              latitude: -33.88183,
              longitude: 151.227008,
            }, {
              id: 3,
              latitude: -33.875491,
              longitude: 151.215855,
            }], 
            showPropertyInformation: true,
            displayPropertyInformation: 'none',
        }
        this.togglePropertyInformation=this.togglePropertyInformation.bind(this);
    }

    // renderPins () {
    //     this.state.property.map((item) => { 
    //     return (<Marker 
    //                   className='propertyMarker'
    //                   key={item.id} 
    //                   latitude={item.latitude} 
    //                   longitude={item.longitude}>
    //             <IoIosPin className='propertyMarkerPin'/>
    //             </Marker>)
    //     })
    // }

    togglePropertyInformation () {

      this.setState((prevstate)=>({
          showPropertyInformation: !prevstate.showPropertyInformation,
          displayPropertyInformation: this.state.showPropertyInformation ? 'block' : 'none'
        }));
    }
  
    render() {
      return (
        <div className='row'>
          <ReactMapGL 
                className='map' 
                mapStyle='mapbox://styles/mapbox/outdoors-v10'
                {...this.state.viewport} 
                onViewportChange={(viewport => this.setState({viewport}))} 
                mapboxApiAccessToken='pk.eyJ1IjoiaXJhcGFsaXkiLCJhIjoiY2syZXY3ZThuMDNldDNjcWszYmF3MGVjbiJ9.XZbadn1EL3fhX47KSbcVzA'>
                  <NavigationControl className='navigationControl'/>
                  <Marker 
                    className='propertyMarker'
                    latitude={this.state.property[0].latitude}
                    longitude={this.state.property[0].longitude}
                  >
                    <IoIosPin 
                        onClick={this.togglePropertyInformation} 
                        size='3em' className='propertyMarkerPin'
                    />
                  </Marker>
                  {/* {this.renderPins()} */}
                  <PropertyCard displayPropertyInformation={this.state.displayPropertyInformation}/>
          </ReactMapGL>

        </div>
      )
    }
  }
  export default Map;

