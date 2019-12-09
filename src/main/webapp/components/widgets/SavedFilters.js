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

  async handleDeleteFilter (id) {
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
  
        //   this.setState({ notifications : JSON.stringify(data) });
        this.setState({ notifications : data });
    } catch (err) {
        console.log('error delete filter');
    }
}

  async handleEditFilter (id) {
    try {
        const response = await fetch(`/api/notifications/${id}`, {
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
                        {item.propertyZone ? `Zone: ${item.propertyZone}` : null}<br/>
                        {item.propertyAreaMin ? `Area min: ${item.propertyAreaMin}` : null}<br/>
                        {item.propertyAreaMax ? `Area max: ${item.propertyAreaMax}` : null}<br/>
                        {item.propertyPriceMin ? `Price min: ${item.propertyPriceMin}` : null}<br/>
                        {item.propertyPriceMax ? `Price max: ${item.propertyPriceMax}` : null}<br/>
                        {item.propertyPSMMin ? `Price per m2 min: ${item.propertyPSMMin}` : null}<br/>
                        {item.propertyPSMMax ? `Price per m2 max: ${item.propertyPSMMax}` : null}<br/>  
                        {item.propertyPostCode ? `Post code: ${item.propertyPostCode}` : null}<br/>
                        {item.propertyPriceToLandValueMin ? `Price to landvalue min: ${item.propertyPriceToLandValueMin}` : null}<br/>
                        {item.propertyPriceToLandValueMax ? `Price to landvalue max: ${item.propertyPriceToLandValueMax}` : null}<br/> 
                        {item.propertyFloorSpaceRatioMin ? `Floorspace ratio min: ${item.propertyFloorSpaceRatioMin}` : null}<br/> 
                        {item.propertyFloorSpaceRatioMax ? `Floorspace ratio max: ${item.propertyFloorSpaceRatioMax}` : null}<br/> 
                    </label>
                </div>
                <div>
                    <TiPencil className='filterItemIcon' size='1.3em' onClick={this.handleEditFilter.bind(this, item.id)}/>
                    <TiTrash className='filterItemIcon' size='1.3em' onClick={this.handleDeleteFilter.bind(this, item.id)}/>
                </div>
            </li>
      );
  }

    render() {
      return <ul className='savedFiltersList col-lg-12'>{this.renderData()}</ul>
    }
}
);