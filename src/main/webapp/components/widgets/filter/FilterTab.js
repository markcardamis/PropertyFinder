import React from 'react';
import { withAuth } from '@okta/okta-react';
import { withStyles } from '@material-ui/core/styles';
import {TextField, FormControlLabel, Typography, Checkbox, Button } from '@material-ui/core';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import { connect } from 'react-redux';
import 'rc-dropdown/assets/index.css';

import FilterWidgetBtn from '../../buttons/filterWidgetBtn/FilterWidgetBtn';
import RangeSlider from '../../inputs/slider/Slider';
import {ZONES} from '../../../shared/constants';
import {FaCheck} from 'react-icons/Fa';

class FilterTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: null,
            zone: props.filterTab.filter.zone,
            area: props.filterTab.filter.area,
            price: props.filterTab.filter.price,
            priceM2: props.filterTab.filter.priceM2,
            postCode: props.filterTab.filter.postCode,
            priceLandvalue: props.filterTab.filter.priceLandvalue,
            floorspaceRatio: props.filterTab.filter.floorspaceRatio,
            showValidation: false      
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

    handleSubmit = async () => {
      const {zone, area, price, priceM2, postCode, priceLandvalue, floorspaceRatio} = this.state;

      if (postCode.length !== 4 && postCode.length !== 0) {
        this.setState({showValidation: true})
      } else {
        this.setState({showValidation: false});
        await this.props.dispatch({
          type: 'FILTER',
          payload: {zone, area, price, priceM2, postCode, priceLandvalue, floorspaceRatio}
        })
        this.props.handleSubmit();
      }
    }

    onSelect = ({ key }) => {
      this.setState({zone: key})
    }

    renderZones = () => {
      return ZONES.map(item => {
        return <MenuItem key={item.name}>
                  <div className='checkboxWrapper'>
                    <div className='checkbox' style={{backgroundColor: item.color, border: item.color === '#ffffff' ? '1px solid lightgrey' : null}}>
                        {/* {this.state.zone === item.name ? <FaCheck size={16} color={'#3c475b'}/> : null} */}
                    </div>
                    <div>{item.name}</div>
                  </div>
                </MenuItem>
      })
    }

    render () {
        const { handleSaveFilter } = this.props;
        const menu = (
          <Menu onSelect={this.onSelect}>
            {this.renderZones()}
          </Menu>
        );
    
        return (
            <div>  
              {console.log(this.state.postCode)}
              <div className='zone'>
        <Typography id="range-slider" gutterBottom>Zone:</Typography>
              <Dropdown
                  trigger={['click']}
                  overlay={menu}
                  animation="slide-up"
                >
                  <Button style={{width: '80%'}}variant="outlined">{this.state.zone || 'Select'}</Button>
                </Dropdown>
              </div>
                <div className='slider'>
                  <RangeSlider
                     value={this.state.area}
                     onChange={(e, val)=>this.setState({area: val})}
                     min={0}
                     max={20000}
                     step={100}
                     title={'Area'}
                     labelMin={'0'}
                     labelMax={'20 000+'}
                  />
                </div> 
                <div className='slider'>
                   <RangeSlider
                     value={this.state.price}
                     onChange={(e, val)=>this.setState({price: val})}
                     min={100000}
                     max={5000000}
                     step={10000}
                     title={'Price'}
                     labelMin={'$100k'}
                     labelMax={'$5M'}
                  />
                </div>
                <div className='slider'>
                  <RangeSlider
                     value={this.state.priceM2}
                     onChange={(e, val)=>this.setState({priceM2: val})}
                     name={'priceM2'}
                     min={1}
                     max={10000}
                     step={10}
                     title={'Price per m²'}
                     labelMin={'$1'}
                     labelMax={'$10 000+'}
                  />
                </div>
                <TextField label="Post Code" value={this.state.postCode} onChange={(even)=>this.setState({postCode: event.target.value})}/>
                {this.state.showValidation && <div className='validation'>*must be 4 digits</div>}
                <div className='slider marginTop'>
                  <RangeSlider
                     value={this.state.priceLandvalue}
                     onChange={(e, val)=>this.setState({priceLandvalue: val})}
                     min={0}
                     max={10}
                     step={0.1}
                     title={'Price to Landvalue'}
                     labelMin={'0.0'}
                     labelMax={'10.0'}
                  />
                </div>
                <div className='slider'>
                    <RangeSlider
                     value={this.state.floorspaceRatio}
                     onChange={(e, val)=>this.setState({floorspaceRatio: val})}
                     min={0}
                     max={2}
                     step={0.1}
                     title={'Floorspace Ratio'}
                     labelMin={'0.0'}
                     labelMax={'2.0+'}
                  />
                </div>
                   <div className='filterBtnContainer'>
                      <FilterWidgetBtn disabled={submitting} title={'Search'} onClick={this.handleSubmit}/>
                      <FilterWidgetBtn disabled={false} title={'Save preferences'} onClick={handleSaveFilter}/>
                    </div>
              </div>
        );
        const {submitting } = props;
    }
}
const mapStateToProps = (state) => {
  return {
    filterTab: state
  };
};

  export default withAuth(connect(mapStateToProps)(FilterTab));