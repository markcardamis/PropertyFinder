import React from 'react';
import fetch from 'isomorphic-fetch';
import { TiPencil, TiTrash } from 'react-icons/ti';

class SavedFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            notifications: []
        };
    }

async componentDidMount() {
    try {
        const response = await fetch('/api/notifications', {
            headers: {
              Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
            }
        });
        const data = await response.json();
        console.dir({ data }, 'API: /notifications');
    
        this.setState({ notifications : JSON.stringify(data) });
        } catch (err) {
            console.log('error');   
            console.log('API: /notifications');
            }
      }


    render() {
        return (
            <div>
                {this.state.notifications ? <ul>List of notifications</ul> : <div>Loading..</div>}
                
                <ul className='savedFiltersList col-lg-12'>
                    <li className='filterItem d-flex justify-content-between'>
                        <div>
                            <h5>Filter 1</h5>
                            <label style={{fontSize: '12px'}}>
                                Date last updated/used<br/>
                                Amount of properties found
                            </label>
                        </div>
                        <div>
                            <TiPencil className='filterItemIcon' size='1.3em'/>
                            <TiTrash className='filterItemIcon' size='1.3em'/>
                        </div>
                    </li>
                    <li className='filterItem d-flex justify-content-between'>
                        <div>
                            <h5>Filter 2</h5>
                            <label style={{fontSize: '12px'}}>
                                Date last updated/used<br/>
                                Amount of properties found
                            </label>
                        </div>                    
                        <div>
                            <TiPencil className='filterItemIcon' size='1.3em'/>
                            <TiTrash className='filterItemIcon' size='1.3em'/>
                        </div>
                    </li>
                    <li className='filterItem d-flex justify-content-between'>
                        <div>
                            <h5>Filter 3</h5>
                            <label style={{fontSize: '12px'}}>
                                Date last updated/used<br/>
                                Amount of properties found
                            </label>
                        </div>
                        <div>
                            <TiPencil className='filterItemIcon' size='1.3em'/>
                            <TiTrash className='filterItemIcon' size='1.3em'/>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
export default SavedFilters;
