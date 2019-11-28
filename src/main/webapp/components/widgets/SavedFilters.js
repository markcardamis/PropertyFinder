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
        this.renderData=this.renderData.bind(this);
      }
      
  async componentDidMount() {
    try {
        //   const response = await fetch('/api/notifications', {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
            }
        });
        const data = await response.json();
        console.dir({ data });

        //   this.setState({ notifications : JSON.stringify(data) });
        this.setState({ notifications : data });
    } catch (err) {
        console.log('error');
    }
  }


  async handleDeleteFilter (id) {
    try {
        const response = await fetch(`/api/notifications/${id}`, {
        // const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
          method: 'DELETE',
          // headers: {
          //   Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
          // }
        });
        const data = await response.json();
        console.dir({ data });
  
        //   this.setState({ notifications : JSON.stringify(data) });
        // this.setState({ notifications : data });
    } catch (err) {
        console.log('error');
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
        // this.setState({ notifications : data });
    } catch (err) {
      console.log('error');
    }
  }

  renderData () {
    const { notifications } = this.state;

      return notifications.map((item)=>
            <li key={item.id} className='filterItem d-flex justify-content-between'>
                <div>
                    <h5>Filter {notifications.indexOf(item)+1}</h5>
                    <label style={{fontSize: '12px'}}>
                        {/* {item.title}<br/> */}
                        {item.planningZone}<br/>
                        {item.propertyAreaMin}<br/>
                        {item.propertyAreaMax}<br/>
                        {item.propertyPriceMin}<br/>
                        {item.propertyPriceMax}<br/>
                        {item.propertyPSMMin}<br/>
                        {item.propertyPSMMax}<br/>  
                        {item.propertyPostCode}<br/>
                        {item.propertyPriceToLandValueMin}<br/>
                        {item.propertyPriceToLandValueMax}<br/> 
                    </label>
                </div>
                <div>
                    <TiPencil className='filterItemIcon' size='1.3em' onClick={this.handleEditFilter}/>
                    <TiTrash className='filterItemIcon' size='1.3em' onClick={this.handleDeleteFilter(item.id)}/>
                </div>
            </li>
      );
  }

    render() {
        return this.state.notifications ? 
        <ul className='savedFiltersList col-lg-12'>{this.renderData()}</ul> :
        <div>No saved filters</div>;
    }
}
);