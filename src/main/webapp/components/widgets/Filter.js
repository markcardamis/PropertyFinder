import React from 'react';
import { withAuth } from '@okta/okta-react';
import fetch from 'isomorphic-fetch';
import {Field, reduxForm, formValueSelector, change} from 'redux-form';
import { connect } from 'react-redux';

import './Filter.css';
import { FILTER_PARAMETERS } from '../../constants/constants'


class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // isHidden: null,
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
  
      sendCenterCoordinates = async (item) => {
        try {
          const response = await fetch(`/api/listing/${item.id}`, {
            method: 'POST',
            body: JSON.stringify({
              'centreLatitude': this.props.filter.viewport.latitude,
              'centreLongitude': this.props.filter.viewport.longitude
            })
          });
    
          const data = await response.json();
          console.dir(this.props.filter.viewport.longitude);
        } catch (err) {
          console.log('error POST map center coordinates'); 
        }
      }

    // handleClose = () => {
    //     this.setState ({
    //         isHidden: false
    //     });
    // }

    handleSearch = async (value) => {

        this.sendCenterCoordinates(value);

        const emptyQuery = '';
        const zone = value.propertyZone ? ` AND zone:${value.propertyZone}` : '';
        const areaMin = value.propertyAreaMin ? ` AND area>${value.propertyAreaMin}` : '';
        const areaMax = value.propertyAreaMax ? ` AND area<${value.propertyAreaMax}` : '';
        const priceMin = value.propertyPriceMin ? ` AND priceInt>${value.propertyPriceMin}` : '';
        const priceMax = value.propertyPriceMax ? ` AND priceInt>${value.propertyPriceMax}` : '';
        const pricePSMMin = value.propertyPricePSMMin ? ` AND pricePSM>${value.propertyPricePSMMin}` : '';
        const pricePSMMax = value.propertyPricePSMMax ? ` AND pricePSM<${value.propertyPricePSMMax}` : '';
        const postCode = value.propertyPostCode ? ` AND postCode:${value.propertyPostCode}` : '';
        const landvalueMin = value.propertyPriceToLandValueMin ? ` AND priceToLandValue>${value.propertyPriceToLandValueMin}` : '';
        const landvalueMax = value.propertyPriceToLandValueMax ? ` AND priceToLandValue<${value.propertyPriceToLandValueMax}` : '';
        const floorMin = value.propertyFloorSpaceRatioMin ? ` AND floorSpaceRatio>${value.propertyFloorSpaceRatioMin}` : '';
        const floorMax = value.propertyPriceToLandValueMax ? ` AND floorSpaceRatio<${value.propertyFloorSpaceRatioMax}` : '';

        const query = emptyQuery.concat(zone, areaMin, areaMax, priceMin, priceMax, pricePSMMin, pricePSMMax, postCode, landvalueMin, landvalueMax, floorMax, floorMin)

        try {
            const response = await fetch(`/api/listing?search=${query}`, {
          });
          const data = await response.json();

          this.props.dispatch({
            type: 'MARKERS',
            payload: data
          })
      } catch (err) {
          console.log('error loading list of filters');
      }        
    }


    render () {
        const { onClick } = this.props;
        return (
            <div>
               <form onSubmit={this.handleSave}>
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
                        <button type='submit' name='search' value='search'>Search</button>
                        <button type='button' name='saveFilter' value='saveFilter' onClick={onClick}>Save Filter</button>
                    </div>
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
        } = selector(state, ...FILTER_PARAMETERS);

  return {
        propertyZone, propertyAreaMin, propertyAreaMax, propertyPriceMin, propertyPriceMax,
        propertyPricePSMMin, propertyPricePSMMax, propertyPostCode, propertyPriceToLandValueMin,
        propertyPriceToLandValueMax, propertyFloorSpaceRatioMin, propertyFloorSpaceRatioMax
    };
})(Filter);

  export default withAuth(Filter);
