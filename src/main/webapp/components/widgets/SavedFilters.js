import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { TiPencil, TiTrash } from 'react-icons/ti';

export default withAuth(class SavedFilters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };
      }
      
  async componentDidMount() {
    try {
          const response = await fetch('/api/notifications', {
        // const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
            }
        });
        const data = await response.json();
        console.dir({ data });

        //   this.setState({ notifications : JSON.stringify(data) });
        this.setState({ notifications : data });
    } catch (err) {
        console.log('error loading list of filters');
    }
  }

  async handleSelectFilter(item) {
    try {
      const response = await fetch(`/api/listing/notifications/${item.id}`, {
  // const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        headers: {
            Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
    });
    const data = await response.json();
    console.dir({ data });
    console.log('filter selected')

} catch (err) {
    console.log('error loading list of filters');
}
  
  }

  async handleDeleteFilter (item) {
    try {
        const response = await fetch(`/api/notifications/${item.id}`, {
        // const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
          }
        });
        const data = await response.json();
        console.dir({ data });
        console.log('filter deleted')
  
        //   this.setState({ notifications : JSON.stringify(data) });
        this.setState({ notifications : data });
    } catch (err) {
        console.log('error delete filter');
    }
}

  async handleEditFilter (item) {
    try {
        const response = await fetch(`/api/notifications/${item.id}`, {
        // const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            body: JSON.stringify({
              'planningZone': 'R5',
              'propertyAreaMin': 5,
            }),
            // headers: {
            //   'Content-type': 'application/json; charset=UTF-8'
            // }
            headers: {
              Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
            }
        });
        const data = await response.json();
        console.dir({ data });
    
        //   this.setState({ notifications : JSON.stringify(data) });
        this.setState({ notifications : data });
    } catch (err) {
      console.log('error editing filter');
    }
  }

  renderData = () => {
    
      return this.state.notifications.map((item)=>
            <li key={item.id} className='filterItem d-flex justify-content-between'>
                <div>
                    <h5>Filter {this.state.notifications.indexOf(item)+1}</h5>
                    <label style={{fontSize: '12px'}} onClick={this.handleSelectFilter}>
                        {/* {item.title}<br/> */}
                        {item.propertyZone} ? <b>Zone: </b>{item.propertyZone} : {null}<br/>
                        {item.propertyAreaMin} ? <b>Area min: </b>{item.propertyAreaMin} : {null}<br/>
                        {item.propertyAreaMax} ? <b>Area max: </b>{item.propertyAreaMax} : {null}<br/>
                        {item.propertyPriceMin} ? <b>Price min: </b>{item.propertyPriceMin} : {null}<br/>
                        {item.propertyPriceMax} ? <b>Price max: </b>{item.propertyPriceMax} : {null}<br/>
                        {item.propertyPSMMin} ? <b>Price per m<sup>2</sup> min: </b>{item.propertyPSMMin} : {null}<br/>
                        {item.propertyPSMMax} ? <b>Price per m<sup>2</sup> max: </b>{item.propertyPSMMax} : {null}<br/>  
                        {item.propertyPostCode} ? <b>Post code: </b>{item.propertyPostCode} : {null}<br/>
                        {item.propertyPriceToLandValueMin} ? <b>Price to landvalue min: </b>{item.propertyPriceToLandValueMin} : {null}<br/>
                        {item.propertyPriceToLandValueMax} ? <b>Price to landvalue max: </b>{item.propertyPriceToLandValueMax} : {null}<br/> 
                        {item.propertyFloorSpaceRatioMin} ? <b>Floorspace ratio min: </b>{item.propertyFloorSpaceRatioMin} : {null}<br/> 
                        {item.propertyFloorSpaceRatioMax} ? <b>Floorspace ratio max: </b>{item.propertyFloorSpaceRatioMax} : {null}<br/> 
                    </label>
                </div>
                <div>
                    <TiPencil className='filterItemIcon' size='1.3em' onClick={this.handleEditFilter}/>
                    <TiTrash className='filterItemIcon' size='1.3em' onClick={this.handleDeleteFilter}/>
                </div>
            </li>
      );
  }

    render() {
      return <ul className='savedFiltersList col-lg-12'>{this.renderData()}</ul>
    }
}
);