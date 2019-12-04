import React from 'react';
import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl';
import './Map.css';
import PropertyCard from '../widgets/PropertyCard';
import { IoIosPin } from 'react-icons/io';
// import { PROPERTY_DATA } from '../../constants/constants';
import { connect } from 'react-redux';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
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
        };
        this.renderPins=this.renderPins.bind(this);
    }

    renderPins () {
        return (this.props.map.mapMarker.map((item) => 
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
                        onClick={this.handleClick.bind(this, item.id, item.image, item.price, item.bedroom, item.bathroom, item.bathroom, item.carspace, item.area, item.zone, item.fsr, item.domainurl, item.landvalue)}
                        size='3em' 
                        className='propertyMarkerPin'
                    />
                </Marker>
        )
        );}

  handleClick (id, image, price, bedroom, bathroom, carspace, area, zone, fsr, domainurl, landvalue) {
    this.props.dispatch({type: 'SHOW_PROPERTY'});
    this.setState({
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

  handleViewportChange = (viewport) => {
    this.props.dispatch ({
      type: 'VIEWPORT_CHANGE', 
      payload: viewport
    });
  }


    render() {
      return (
        <div className='row'>
          <ReactMapGL 
                className='map col-lg-12 col-md-12 col-sm-12' 
                mapStyle='mapbox://styles/mapbox/outdoors-v10'
                {...this.props.map.viewport}
                onViewportChange={this.handleViewportChange} 
                mapboxApiAccessToken='pk.eyJ1IjoiaXJhcGFsaXkiLCJhIjoiY2syZXY3ZThuMDNldDNjcWszYmF3MGVjbiJ9.XZbadn1EL3fhX47KSbcVzA'>
                <NavigationControl className='navigationControl'/>
                {this.renderPins()}
                {this.props.map.showProperty && <PropertyCard propertyData={this.state.property}/>}
          </ReactMapGL>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
        map: state,
    };
};

export default connect(mapStateToProps)(Map);
