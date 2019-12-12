import React from 'react';
import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl';
import { connect } from 'react-redux';
import { IoIosPin } from 'react-icons/io';
import { withAuth } from '@okta/okta-react';
import fetch from 'isomorphic-fetch';

import PropertyCard from '../widgets/PropertyCard';
import { PROPERTY_DATA, MAPBOX_API, MAPBOX_STYLE } from '../../constants/constants';
import './Map.css';

class Map extends React.Component {

  async componentDidMount () {
    try {
        const response = await fetch('/api/listing', 

          // await this.props.auth.getAccessToken() ? {
          //     headers: {
          //     Authorization:  'Bearer ' + await this.props.auth.getAccessToken()
          //     }
          //   } : null
      // const response = await fetch('https://jsonplaceholder.typicode.com/posts', 
        )
  
      const data = await response.json();
      console.dir({ data });

      this.props.dispatch({
        type: 'MARKERS',
        payload: data
      })
  } catch (err) {
      console.log('error get listings');
  }
  }

   renderPins = () => {
        return (this.props.map.mapMarker.map((item) =>
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
                mapStyle={MAPBOX_STYLE}
                {...this.props.map.viewport} 
                onViewportChange={this.handleViewportChange} 
                mapboxApiAccessToken={MAPBOX_API} >
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
