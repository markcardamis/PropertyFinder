import React from 'react';
import { withAuth } from '@okta/okta-react';
import {Field, reduxForm} from 'redux-form';

import { renderField, onlyNumber, minValue0, maxValue99, maxValue999, maxValue1000000, maxValue50000000 } from '../../shared/formValidation';


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

    render () {
        const { handleSubmit, handleSaveFilter } = this.props;
    
        return (
            <div>
                <form onSubmit={handleSubmit}>
                      <div>
                             <Field name='propertyZone' label='Zone' component={renderField} type='text'/>
                         <div>Area<br/>
                         <span style={{display: 'flex'}}>
                             <Field name='propertyAreaMin' component={renderField} validate={[onlyNumber, minValue0]} type='text' placeholder='min' style={{width: '60px'}}/> - 
                             <Field name='propertyAreaMax' component={renderField} validate={[onlyNumber, maxValue1000000]} type='text' placeholder='max' style={{width: '60px'}}/> 
                             </span>
                         </div> 
                         <div>Price<br/>
                            <span style={{display: 'flex'}}>
                              <Field name='propertyPriceMin' component={renderField} type='text' validate={[onlyNumber, minValue0]} placeholder='min' style={{width: '60px'}}/> - 
                              <Field name='propertyPriceMax' component={renderField} type='text' validate={[onlyNumber, maxValue50000000]} placeholder='max' style={{width: '60px'}}/> 
                              </span>
                         </div>
                         <div>Price per m<sup>2</sup><br/>
                            <span style={{display: 'flex'}}>
                              <Field name='propertyPricePSMMin' component={renderField} type='text' validate={[onlyNumber, minValue0]} placeholder='min' style={{width: '60px'}}/> - 
                              <Field name='propertyPricePSMMax' component={renderField} type='text' validate={[onlyNumber, maxValue1000000]} placeholder='max' style={{width: '60px'}}/> 
                              </span>
                         </div>
                        <Field name='propertyPostCode' label='Post Code' component={renderField} validate={onlyNumber} type='text'/>
                         <div>Price to Landvalue<br/>
                            <span style={{display: 'flex'}}>
                             <Field name='propertyPriceToLandValueMin' component={renderField} validate={[onlyNumber, minValue0]} type='text' placeholder='min' style={{width: '60px'}}/> - 
                             <Field name='propertyPriceToLandValueMax' component={renderField} validate={[onlyNumber, maxValue999]} type='text' placeholder='max' style={{width: '60px'}}/> 
                            </span>
                         </div>
                         <div>Floorspace Ratio<br/>
                            <span style={{display: 'flex'}}>
                             <Field name='propertyFloorSpaceRatioMin' component={renderField} validate={[onlyNumber, minValue0]} type='text' placeholder='min' style={{width: '60px'}}/> - 
                             <Field name='propertyFloorSpaceRatioMax' component={renderField} validate={[onlyNumber, maxValue99]} type='text' placeholder='max' style={{width: '60px'}}/> 
                            </span>
                         </div>
                        <button type='submit' disabled={submitting}>Search</button>
                        <button type='button' onClick={handleSaveFilter}>Save preferences</button>
                    </div>
                  </form>
              </div>
        );
        const {submitting } = props;
    }
}

Filter = reduxForm({
    form: "filter", 
  })(Filter);

  export default withAuth(Filter);