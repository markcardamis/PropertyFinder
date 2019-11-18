import React from 'react';
import ReactMapGL, {NavigationControl, Marker, Layer, Feature} from 'react-map-gl';
import './Map.css';
import PropertyCard from '../widgets/PropertyCard';
import { IoIosPin } from 'react-icons/io';
import { PROPERTY_DATA } from '../../constants';

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
            isHidden: false,              
            propertyInfo: ''
        }
        // this.togglePropertyInformation=this.togglePropertyInformation.bind(this, id);
        this.renderPins=this.renderPins.bind(this);
    }

    renderPins () {
        return (PROPERTY_DATA.map((item) => 
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
          // isHidden: !prevState.isHidden,
          isHidden: true,
          propertyInfo: id
        }));
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
                {this.state.isHidden && <PropertyCard id={this.state.propertyInfo}/>}
          </ReactMapGL>

        </div>
      )
    }
  }
  export default Map;

