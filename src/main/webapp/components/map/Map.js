import React from 'react';
import ReactMapGL, {NavigationControl, Marker, Layer, Feature} from 'react-map-gl';
import './Map.css';
import PropertyCard from '../widgets/PropertyCard';
import { IoIosPin } from 'react-icons/io';
import { PROPERTY_COORDINATES } from '../../constants';

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
            propertyInfo: ''
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

      this.setState((prevState)=>({
          showPropertyInformation: !prevState.showPropertyInformation,
          displayPropertyInformation: this.state.showPropertyInformation ? 'block' : 'none',
          // propertyInfo: id
        }));
      propertyInfo=id;
      id.onChange={function () {console.log('changed')}};
      // console.log(this.state.propertyInfo)
      // console.log(prevState)
    }


  
    render() {
      return (
        <div className='row'>
          <ReactMapGL 
                className='map col-lg-12' 
                mapStyle='mapbox://styles/mapbox/outdoors-v10'
                {...this.state.viewport} 
                onViewportChange={(viewport => this.setState({viewport}))} 
                mapboxApiAccessToken='pk.eyJ1IjoiaXJhcGFsaXkiLCJhIjoiY2syZXY3ZThuMDNldDNjcWszYmF3MGVjbiJ9.XZbadn1EL3fhX47KSbcVzA'>
                <NavigationControl className='navigationControl'/>
                {this.renderPins()}
                <PropertyCard id={this.state.propertyInfo} displayPropertyInformation={this.state.displayPropertyInformation}/>
          </ReactMapGL>

        </div>
      )
    }
  }
  export default Map;

