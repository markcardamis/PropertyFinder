import React from 'react';
import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl';
import { connect } from 'react-redux';
import { IoIosPin } from 'react-icons/io';
import { withAuth } from '@okta/okta-react';
import fetch from 'isomorphic-fetch';

import PropertyCard from '../widgets/PropertyCard';
import { PROPERTY_DATA } from '../../constants/constants'
import './Map.css';

class Map extends React.Component {

  async componentDidMount () {
    try {
        const response = await fetch('/api/listing', {
      // const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          // headers: {
          //     Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
          // }
      });
      const data = await response.json();
      console.dir({ data });

      this.props.dispatch({
        type: 'MARKERS',
        payload: data
      })
  } catch (err) {
      console.log('error');
  }
  }

    renderPins = () => {
        return (PROPERTY_DATA.map((item) =>
        // return (this.props.map.mapMarker.map((item) =>
                <Marker 
                      className='propertyMarker'
                      key={item.id}
                      latitude={item.latitude} 
                      longitude={item.longitude}
                      
                >
                    <IoIosPin 
                        onClick={this.handleClick.bind(this, item)}
                        size='3em' 
                        className='propertyMarkerPin'
                    />
                </Marker>
        )
        );}

  async handleClick (item) {
    this.props.dispatch({type: 'SHOW_PROPERTY', payload: item});

  //   try {
  //     //   const response = await fetch(`/api/listing/${item.id}`, {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  //         headers: {
  //             Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
  //         }
  //     });
  //     const data = await response.json();
  //     console.dir({ data });

  // } catch (err) {
  //     console.log('error');
  // }

    try {
      const response = await fetch(`/api/listing/${item.id}`, {
      // const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'centreLatitude': this.props.map.viewport.latitude,
          'centreLongitude': this.props.map.viewport.longitude
        })
      });

      const data = await response.json();
      console.dir({ data });
    } catch (err) {
      console.log('error'); 
    }
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
          {console.log(this.props.map.mapMarker)}
          <ReactMapGL 
                className='map col-lg-12 col-md-12 col-sm-12' 
                mapStyle='mapbox://styles/mapbox/outdoors-v10'
                {...this.props.map.viewport}
                onViewportChange={this.handleViewportChange} 
                mapboxApiAccessToken='pk.eyJ1IjoiaXJhcGFsaXkiLCJhIjoiY2syZXY3ZThuMDNldDNjcWszYmF3MGVjbiJ9.XZbadn1EL3fhX47KSbcVzA'>
                <NavigationControl className='navigationControl'/>
                {this.renderPins()}
                {this.props.map.showProperty.isHidden && <PropertyCard/>}
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

export default withAuth(connect(mapStateToProps)(Map));
