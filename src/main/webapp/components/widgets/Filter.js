import React from 'react';
import { withAuth } from '@okta/okta-react';
import fetch from 'isomorphic-fetch';
import {Field, reduxForm, formValueSelector, change} from 'redux-form';
import { connect } from 'react-redux';

import './Filter.css';
import SignIn from './SignIn';
import { FILTER_PARAMETERS } from '../../constants/constants'


class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHidden: null,
            authenticated: null,
            notifications: []
        };
        this.checkAuthentication();
    }

   checkAuthentication =  async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
        }
      }
      
    componentDidUpdate() {
        this.checkAuthentication();
      }

    handleSaveFilter = async () => {
        this.checkAuthentication();

        this.setState({
            isHidden: this.state.authenticated ? false : true
        });

        try {
            const response = await fetch('/api/notifications', {
                method: 'POST',
              headers: {
                Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
                'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                    'propertyZone': this.props.propertyZone,
                    'propertyAreaMin': this.props.propertyAreaMin,
                    'propertyAreaMax': this.props.propertyAreaMax,
                    'propertyPriceMin': this.props.propertyPriceMin,
                    'propertyPriceMax': this.props.propertyPriceMax,
                    'propertyPricePSMMin': this.props.propertyPricePSMMin,
                    'propertyPricePSMMax': this.props.propertyPricePSMMax,
                    'propertyPostCode': this.props.propertyPostCode,
                    'propertyPriceToLandValueMin': this.props.propertyPriceToLandValueMin,
                    'propertyPriceToLandValueMax': this.props.propertyPriceToLandValueMax,
                    'propertyFloorSpaceRatioMin': this.props.propertyFloorSpaceRatioMin,
                    'propertyFloorSpaceRatioMax': this.props.propertyFloorSpaceRatioMax
              })
            });

            const data = await response.json();
            console.dir({ data });
      
            this.setState({ notifications : JSON.stringify(data) });
          } catch (err) {
            console.log('error API: filter - POST');   
          }
    }

    handleClose = () => {
        this.setState ({
            isHidden: false
        });
    }

    render () {
        const { handleSubmit } = this.props;
        return (
            <div>
               <form onSubmit={handleSubmit}>
                     <div className='col-lg-9'>
                        <p>Zone
                            <Field name='propertyZone' component='input' type='text'/>
                        </p>
                        <p>Area<br/>
                            <Field name='propertyAreaMin' component='input' type='text' placeholder='min' style={{width: '60px'}}/> - 
                            <Field name='propertyAreaMax' component='input' type='text' placeholder='max' style={{width: '60px'}}/> 
                        </p> 
                        <p>Price<br/>
                            <Field name='propertyPriceMin' component='input' type='text' placeholder='min' style={{width: '60px'}}/> - 
                            <Field name='propertyPriceMax' component='input' type='text' placeholder='max' style={{width: '60px'}}/> 
                        </p>
                        <p>Price per m<sup>2</sup><br/>
                            <Field name='propertyPricePSMMin' component='input' type='text' placeholder='min' style={{width: '60px'}}/> - 
                            <Field name='propertyPricePSMMax' component='input' type='text' placeholder='max' style={{width: '60px'}}/> 
                        </p>
                        <p>Post Code
                            <Field name='propertyPostCode' component='input' type='text'/>
                        </p>
                        <p>Price to Landvalue<br/>
                            <Field name='propertyPriceToLandValueMin' component='input' type='text' placeholder='min' style={{width: '60px'}}/> - 
                            <Field name='propertyPriceToLandValueMax' component='input' type='text' placeholder='max' style={{width: '60px'}}/> 
                        </p>
                        <p>Floorspace Ratio<br/>
                            <Field name='propertyFloorSpaceRatioMin' component='input' type='text' placeholder='min' style={{width: '60px'}}/> - 
                            <Field name='propertyFloorSpaceRatioMax' component='input' type='text' placeholder='max' style={{width: '60px'}}/> 
                        </p>
                <button type='submit'>Search</button>
                <button onClick={this.handleSaveFilter}>Save preferences</button>
            </div>
            {this.state.isHidden && <SignIn onClick={this.handleClose.bind(this)}/>}
            </form>
            </div>
        );
    }
}

Filter = reduxForm({
    form: "filter" 
  })(Filter);

  const selector = formValueSelector("filter");
Filter = connect(state => {
 
  const { propertyZone, propertyAreaMin, propertyAreaMax, propertyPriceMin, propertyPriceMax,
        propertyPricePSMMin, propertyPricePSMMax, propertyPostCode, propertyPriceToLandValueMin,
        propertyPriceToLandValueMax, propertyFloorSpaceRatioMin,propertyFloorSpaceRatioMax
    // } = selector(state, 'propertyZone', 'propertyAreaMin', 'propertyAreaMax', 'propertyPriceMin',
    //     'propertyPriceMax', 'propertyPricePSMMin', 'propertyPricePSMMax', 'propertyPostCode',
    //     'propertyPriceToLandValueMin', 'propertyPriceToLandValueMax','propertyFloorSpaceRatioMin',
    //     'propertyFloorSpaceRatioMax');
} = selector(state, ...FILTER_PARAMETERS);

  return {
        propertyZone, propertyAreaMin, propertyAreaMax, propertyPriceMin, propertyPriceMax,
        propertyPricePSMMin, propertyPricePSMMax, propertyPostCode, propertyPriceToLandValueMin,
        propertyPriceToLandValueMax, propertyFloorSpaceRatioMin, propertyFloorSpaceRatioMax
    };
})(Filter);

  export default withAuth(Filter);
