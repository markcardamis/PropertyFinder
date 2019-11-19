import React from 'react';
import ReactMapGL, {NavigationControl, Marker, Popup} from 'react-map-gl';
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
            property: {
              id: '',
              image: '',
              price: '',
              bedroom: '',
              bathroom: '',
              carspace: '',
              area: '',
              zone: '',
              fsr: '',
              domainurl: '',
              landvalue: ''
              }
        }
        this.renderPins=this.renderPins.bind(this);
    }

    renderPins () {
        return (PROPERTY_DATA.map((item) => 
                <Marker 
                      className='propertyMarker'
                      key={item.id}
                      latitude={item.latitude} 
                      longitude={item.longitude}
                      
                >
                    <IoIosPin 
                        id={item.id}
                        image={item.image}
                        price={item.price}
                        bedroom={item.bedroom}
                        bathroom={item.bathroom}
                        carspace={item.carspace}
                        area={item.area}
                        zone={item.zone}
                        fsr={item.fsr}
                        domainurl={item.domainurl}
                        landvalue={item.landvalue}
                        onClick={this.togglePropertyInformation.bind(this, item.id, item.image, item.price, item.bedroom, item.bathroom, item.carspace, item.zone, item.fsr, item.area, item.domainurl, item.landvalue)} 
                        size='3em' 
                        className='propertyMarkerPin'
                    />
                </Marker>
        )
        )}

    togglePropertyInformation (id, image, price, bedroom, bathroom, carspace, area, zone, fsr, domainurl, landvalue) {

      this.setState({
          isHidden: true,
          property: {
            id: id,
            image: image,
            price: price,
            bedroom: bedroom,
            bathroom: bathroom,
            carspace: carspace,
            area: area,
            zone: zone,
            fsr: fsr,
            domainurl: domainurl,
            landvalue: landvalue
            }
        });
    }

    handleClose () {
      this.setState({
        isHidden: false,
      })
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
                {this.state.isHidden && <PropertyCard onClick={this.handleClose.bind(this)} property={this.state.property}/>}
          </ReactMapGL>
        </div>
      )
    }
  }
  export default Map;