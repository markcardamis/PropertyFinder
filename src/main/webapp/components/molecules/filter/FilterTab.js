
import React from 'react';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import 'rc-dropdown/assets/index.css';

import {ZONES} from '../../../shared/constants';
import './filter.scss';
import {FilterLine, ZoneSelect, PostCode} from './components';
import DeviderLine from '../../atoms/deviderLine/DeviderLine';
import ButtonOutlined from '../../atoms/buttonOutlined/ButtonOutlined';
import ButtonFilled from '../../atoms/buttonFilled/ButtonFilled';
import {IconArea, IconFsr, IconLandval, IconPrice, IconPriceM, IconZone, IconPost} from '../../../assets/icons';

class FilterTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            zone: props.filterTab.filter.zone,
            zoneColor: null,
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
      let zoneColor = ZONES.filter(item=>{
        return item.name===key
      })
      this.setState({zoneColor: zoneColor[0].color})
    }

    handleSaveFilter = async () => {
      const {zone, area, price, priceM2, postCode, priceLandvalue, floorspaceRatio} = this.state;
      if (postCode.length !== 4 && postCode.length !== 0) {
        this.setState({showValidation: true})
      } else {
        this.setState({showValidation: false});
        await this.props.dispatch({
          type: 'FILTER',
          payload: {zone, area, price, priceM2, postCode, priceLandvalue, floorspaceRatio}
        })
        this.props.handleSaveFilter();
    }
  }

    render () {
  
        return (
            <div>  
              <ZoneSelect zone={this.state.zone} zoneColor={this.state.zoneColor} title22={'Zone'} icon={<IconZone/>} onSelect={this.onSelect}/>
              <PostCode title22={'Post Code'} icon={<IconPost/>} value={this.state.postCode} showValidation={this.state.showValidation} onChange={(event)=>this.setState({postCode: event.target.value})}/>
              <DeviderLine/>
             
               {/* <TextField label="Post Code" value={this.state.postCode} onChange={(event)=>this.setState({postCode: event.target.value})}/>*/}
            
                <FilterLine title22={'Area'} icon={<IconArea/>} value={this.state.area} step={100} 
                            onChange={(val)=>this.setState({area: val})} min={0} max={20000} labelMin={'0'} labelMax={'20 000+'}/>
                <FilterLine title22={'Floor Space Ratio'} icon={<IconFsr/>} value={this.state.floorspaceRatio} step={0.1} 
                            onChange={(val)=>this.setState({floorspaceRatio: val})} min={0} max={2} labelMin={'0.0'} labelMax={'2.0+'}/>
                <DeviderLine/>
                <FilterLine title22={'Price'} icon={<IconPrice/>} value={this.state.price} step={10000} 
                            onChange={(val)=>this.setState({price: val})} min={100000} max={5000000} labelMin={'$100k'} labelMax={'$5M'}/>
                <FilterLine title22={'Price per m²'} icon={<IconPriceM/>} value={this.state.priceM2} step={10} 
                            onChange={(val)=>this.setState({priceM2: val})} min={0} max={10000} labelMin={'$1'} labelMax={'$10 000+'}/>
                <FilterLine title22={'Price to Land Value'} icon={<IconLandval/>} value={this.state.priceLandvalue} step={0.1} 
                            onChange={(val)=>this.setState({priceLandvalue: val})} min={0} max={10} labelMin={'0.0'} labelMax={'10.0'}/>
      
                 <div className='filterBtnContainer'>
                  <ButtonOutlined title={'Save preferences'} onClick={this.handleSaveFilter} width={'25%'}/>
                  <ButtonFilled  title={'Search'} onClick={this.handleSubmit} width={'65%'}/>
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