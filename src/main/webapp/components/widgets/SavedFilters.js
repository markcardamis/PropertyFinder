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

  async getFilterList () {
    try {
        const response = await fetch('/api/notifications', {
      // const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          headers: {
              Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
          }
      });
      const data = await response.json();
      console.dir({ data });
      console.log('successfully loaded list of filters');

      //   this.setState({ notifications : JSON.stringify(data) });
      this.setState({ notifications : data });
    } catch (err) {
        console.log('error loading list of filters');
    }
      }

  componentDidMount() {
    this.getFilterList();
  }

  componentDidUpdate() {
    this.getFilterList();
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
    console.log(item);
    console.log('filter selected');

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
                <div onClick={this.handleSelectFilter.bind(this, item)}>
                    <h5>Filter {this.state.notifications.indexOf(item)+1}</h5>
                    <ul style={{fontSize: '12px', listStyle: 'none'}} onClick={this.handleSelectFilter}>
                        {/* {item.title}<br/> */}
                        <li>{item.propertyZone ? `Zone: ${item.propertyZone}` : null}</li>
                        <li>{item.propertyAreaMin ? `Area min: ${item.propertyAreaMin}` : null}</li>
                        <li>{item.propertyAreaMax ? `Area max: ${item.propertyAreaMax}` : null}</li>
                        <li>{item.propertyPriceMin ? `Price min: ${item.propertyPriceMin}` : null}</li>
                        <li>{item.propertyPriceMax ? `Price max: ${item.propertyPriceMax}` : null}</li>
                        <li>{item.propertyPSMMin ? `Price per m2 min: ${item.propertyPSMMin}` : null}</li>
                        <li>{item.propertyPSMMax ? `Price per m2 max: ${item.propertyPSMMax}` : null}</li>  
                        <li>{item.propertyPostCode ? `Post code: ${item.propertyPostCode}` : null}</li>
                        <li>{item.propertyPriceToLandValueMin ? `Price to landvalue min: ${item.propertyPriceToLandValueMin}` : null}</li>
                        <li>{item.propertyPriceToLandValueMax ? `Price to landvalue max: ${item.propertyPriceToLandValueMax}` : null}</li> 
                        <li>{item.propertyFloorSpaceRatioMin ? `Floorspace ratio min: ${item.propertyFloorSpaceRatioMin}` : null}</li> 
                        <li>{item.propertyFloorSpaceRatioMax ? `Floorspace ratio max: ${item.propertyFloorSpaceRatioMax}` : null}</li> 
                    </ul>
                </div>
                <div>
                    <TiPencil className='filterItemIcon' size='1.3em' onClick={this.handleEditFilter.bind(this, item)}/>
                    <TiTrash className='filterItemIcon' size='1.3em' onClick={this.handleDeleteFilter.bind(this, item)}/>
                </div>
            </li>
      );
  }

    render() {
      return <ul className='savedFiltersList col-lg-12'>{this.renderData()}</ul>
    }
}
);