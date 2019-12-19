import React from 'react';
import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl';
import { connect } from 'react-redux';
import { IoIosPin } from 'react-icons/io';
import { withAuth } from '@okta/okta-react';
import fetch from 'isomorphic-fetch';

import { MAPBOX_API, MAPBOX_STYLE } from '../../shared/constants';

class Map extends React.Component {

  async componentDidMount () {
    try {
        const response = await fetch('/api/listing', 
        )
      const data = await response.json();

      this.props.dispatch({
        type: 'MARKERS',
        payload: data
      })
  } catch (err) {
      console.log('error get listings');
  }
  }

    renderPins = () => {
        if (this.props.map.showProperty.id) {
          const notClicked = this.props.map.mapMarker.filter(item=>item.id!== this.props.map.showProperty.id);
          console.log(notClicked)
          return (notClicked.map((item) =>
              <div>
                  <Marker className='propertyMarker' key={item.id} latitude={item.latitude} longitude={item.longitude}>
                    <IoIosPin onClick={()=>this.handleMarkerClick(item)} className='propertyMarkerPin'/>
                  </Marker>
                  <Marker className='propertyMarker' latitude={this.props.map.showProperty.latitude} longitude={this.props.map.showProperty.longitude}>
                   <IoIosPin onClick={()=>this.handleMarkerClick(item)} className='propertyMarkerPin' style={{color: 'blue', paddingTop: 0}}/>
                 </Marker>
              </div> 
          ))} else {
          return (this.props.map.mapMarker.map((item) =>
            <Marker className='propertyMarker' key={item.id} latitude={item.latitude} longitude={item.longitude}>
              <IoIosPin onClick={()=>this.handleMarkerClick(item)} className='propertyMarkerPin'/>
            </Marker> 
          ))}
        }

    handleMarkerClick = async (item) => {
        try {
            const response = await fetch(`/api/listing/${item.id}`, {
          });
          const data = await response.json();
          console.dir({ data });
          this.props.dispatch({type: 'SHOW_PROPERTY', payload: data});

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
          <ReactMapGL 
                className='map col-lg-12 col-md-12 col-sm-12' 
                mapStyle={MAPBOX_STYLE}
                {...this.props.map.viewport} 
                onViewportChange={this.handleViewportChange} 
                mapboxApiAccessToken={MAPBOX_API} >
                <NavigationControl className='navigationControl'/>
                {this.renderPins()}
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
