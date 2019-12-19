import React from 'react';
import { withAuth } from '@okta/okta-react';
import {Field, reduxForm} from 'redux-form';

import './Filter.css';
import { renderField, onlyNumber, minValue, maxValue } from '../../shared/formValidation';


class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: null,
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

    render (props) {
        const { handleSubmit, handleSaveFilter } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='col-lg-9'>
                             <Field name='propertyZone' label='Zone' component={renderField} type='text'/>
                         <div>Area<br/>
                         <span style={{display: 'flex'}}>
                             <Field name='propertyAreaMin' component={renderField} validate={onlyNumber, minValue(0)} type='text' placeholder='min' style={{width: '60px'}}/> - 
                             <Field name='propertyAreaMax' component={renderField} validate={onlyNumber, maxValue(1000000)} type='text' placeholder='max' style={{width: '60px'}}/> 
                             </span>
                         </div> 
                         <div>Price<br/>
                            <span style={{display: 'flex'}}>
                              <Field name='propertyPriceMin' component={renderField} type='text' validate={onlyNumber, minValue(0)} placeholder='min' style={{width: '60px'}}/> - 
                              <Field name='propertyPriceMax' component={renderField} type='text' validate={onlyNumber, maxValue(50000000)} placeholder='max' style={{width: '60px'}}/> 
                              </span>
                         </div>
                         <div>Price per m<sup>2</sup><br/>
                            <span style={{display: 'flex'}}>
                              <Field name='propertyPricePSMMin' component={renderField} type='text' validate={onlyNumber, minValue(0)} placeholder='min' style={{width: '60px'}}/> - 
                              <Field name='propertyPricePSMMax' component={renderField} type='text' validate={onlyNumber, maxValue(1000000)} placeholder='max' style={{width: '60px'}}/> 
                              </span>
                         </div>
                        <Field name='propertyPostCode' label='Post Code' component={renderField} validate={onlyNumber} type='text'/>
                         <div>Price to Landvalue<br/>
                            <span style={{display: 'flex'}}>
                             <Field name='propertyPriceToLandValueMin' component={renderField} validate={onlyNumber, minValue(0)} type='text' placeholder='min' style={{width: '60px'}}/> - 
                             <Field name='propertyPriceToLandValueMax' component={renderField} validate={onlyNumber, maxValue(999.90)} type='text' placeholder='max' style={{width: '60px'}}/> 
                            </span>
                         </div>
                         <div>Floorspace Ratio<br/>
                            <span style={{display: 'flex'}}>
                             <Field name='propertyFloorSpaceRatioMin' component={renderField} validate={onlyNumber, minValue(0)} type='text' placeholder='min' style={{width: '60px'}}/> - 
                             <Field name='propertyFloorSpaceRatioMax' component={renderField} validate={onlyNumber, maxValue(99)} type='text' placeholder='max' style={{width: '60px'}}/> 
                            </span>
                         </div>
                        <button type='submit'>Search</button>
                        <button type='button' onClick={handleSaveFilter}>Save preferences</button>
                    </div>
                  </form>
              </div>
        );
    }
}

Filter = reduxForm({
    form: "filter", 
  })(Filter);

  export default withAuth(Filter);