import React from 'react';
import ReactMapGL, {NavigationControl, Marker, Layer, Feature} from 'react-map-gl';
import './Map.css';
import PropertyCard from '../widgets/PropertyCard';
import { IoIosPin } from 'react-icons/io';
import { PROPERTY_COORDINATES } from '../../constants';

let propertyInfo;

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
            showPropertyInformation: true,
            displayPropertyInformation: 'none',
        }
        // this.togglePropertyInformation=this.togglePropertyInformation.bind(this, id);
        this.renderPins=this.renderPins.bind(this);
    }

    renderPins () {
        return (PROPERTY_COORDINATES.map((item) => 
                <Marker 
                      className='propertyMarker'
                      key={item.id} 
                      latitude={item.latitude} 
                      longitude={item.longitude}>
                    <IoIosPin 
                        id={item.id}
                        onClick={this.togglePropertyInformation.bind(this, item.id)} 
                        size='3em' 
                        className='propertyMarkerPin'
                    />
                </Marker>
        )
        )}

    togglePropertyInformation (id) {

      this.setState((prevstate)=>({
          showPropertyInformation: !prevstate.showPropertyInformation,
          displayPropertyInformation: this.state.showPropertyInformation ? 'block' : 'none'
        }));
      propertyInfo=id;
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
                {this.renderPins()}
                <PropertyCard id={propertyInfo} displayPropertyInformation={this.state.displayPropertyInformation}/>
          </ReactMapGL>

        </div>
      )
    }
  }
  export default Map;

