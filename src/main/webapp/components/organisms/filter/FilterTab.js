
import React from "react";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import "rc-slider/assets/index.css";
import "rc-dropdown/assets/index.css";

import {ZONES} from "../../../shared/constants";
import "./filter.scss";
import {FilterLine, ZoneSelect, PostCode} from "./components";
import DeviderLine from "../../atoms/deviderLine/DeviderLine";
import ButtonOutlined from "../../atoms/buttonOutlined/ButtonOutlined";
import ButtonFilled from "../../atoms/buttonFilled/ButtonFilled";
import {IconArea, IconFsr, IconLandval, IconPrice, IconPriceM, IconZone, IconPost} from "../../../assets/icons";
import { getFilter, resetFilter } from "../../../store/actions/filterAction";
import { closeFilter } from "../../../store/actions/filterModalAction";
import { showSearchModal } from "../../../store/actions/searchModalAction";

class FilterTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            zone: this.props.filter.zone,
            zoneColor: null,
            showValidation: false      
        };

       this.checkAuthentication();
    }

   checkAuthentication = async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
        }
      }
          
    componentDidUpdate() {
        this.checkAuthentication();
      }

    handleSubmit = async () => {
      const { postCode } = this.props.filter;
      if (postCode.length !== 4 && postCode.length !== 0) {
        this.setState({showValidation: true});
      } else {
        this.setState({showValidation: false});
        await this.props.getFilter(this.props.filter);
        this.props.handleSubmit();
        this.props.closeFilter();
      }
    }

    onSelect = ({ key }) => {
      this.props.getFilter({...this.props.filter, zone: key});
      let zoneColor = ZONES.filter(item=>{
        return item.name===key;
      });
      this.setState({zoneColor: zoneColor[0].color});
    }

    handleSaveFilter = async () => {
      const { postCode } = this.props.filter;
      if (postCode.length !== 4 && postCode.length !== 0) {
        this.setState({showValidation: true});
      } else {
        this.setState({showValidation: false});
        await this.props.getFilter(this.props.filter);
        this.props.handleSaveFilter();
    }
  }

    render () {
      const {filter} = this.props;
        return (
            <div className='filterTab'> 
              <div className='filterInputContainer'>
              <ZoneSelect 
                zone={filter.zone} 
                zoneColor={this.state.zoneColor} 
                title22={"Zone"} 
                icon={<IconZone/>} 
                onSelect={this.onSelect}
                />
              <PostCode 
                title22={"Post Code"} 
                icon={<IconPost/>} 
                value={filter.postCode} 
                showValidation={this.state.showValidation} 
                onChange={(event)=>this.props.getFilter({...filter, postCode: event.target.value})}
                />
              <DeviderLine/>
                <FilterLine 
                  title22={"Area"} 
                  icon={<IconArea/>} 
                  value={filter.area} 
                  step={100} 
                  showCurrency={false}
                  onChange={(val)=>this.props.getFilter({...filter, area: val})} 
                  min={0} 
                  max={20000} 
                  labelMin={"0"} 
                  labelMax={"20 000+"}
                  />
                <FilterLine 
                  title22={"Floor Space Ratio"} 
                  icon={<IconFsr/>} 
                  value={filter.floorspaceRatio} 
                  step={0.1} 
                  showCurrency={false}
                  onChange={(val)=>this.props.getFilter({...filter, floorspaceRatio: val})} 
                  min={0} 
                  max={2} 
                  labelMin={"0.0"} 
                  labelMax={"2.0+"}
                  />
                <DeviderLine/>
                <FilterLine 
                  title22={"Price"} 
                  icon={<IconPrice/>} 
                  value={filter.price} 
                  step={10000} 
                  showCurrency={true}
                  onChange={(val)=>this.props.getFilter({...filter, price: val})} 
                  min={100000} 
                  max={5000000} 
                  labelMin={"$100k"} 
                  labelMax={"$5M"}
                  />
                <FilterLine 
                  title22={"Price per m²"} 
                  icon={<IconPriceM/>} 
                  value={filter.priceM2} 
                  step={10} 
                  showCurrency={true}
                  onChange={(val)=>this.props.getFilter({...filter, priceM2: val})} 
                  min={0} 
                  max={10000} 
                  labelMin={"$1"} 
                  labelMax={"$10 000+"}
                  />
                <FilterLine 
                  title22={"Price to Land Value"} 
                  icon={<IconLandval/>} 
                  value={filter.priceLandvalue} 
                  step={0.1} 
                  showCurrency={false}
                  onChange={(val)=>this.props.getFilter({...filter, priceLandvalue: val})} 
                  min={0} 
                  max={10} 
                  labelMin={"0.0"} 
                  labelMax={"10.0"}
                  />
                  <div className="resetFilterBtn" onClick={()=>this.props.resetFilter()}>Reset filter</div>
                </div> 
                 <div className='filterBtnContainer'>
                  <div className='btnSavePref'><ButtonOutlined title={"Save preferences"} onClick={this.handleSaveFilter}/></div>
                  <div className='btnSearch'><ButtonFilled title={"Search"} onClick={this.handleSubmit}/></div>
                </div>
              </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
    filterTab: state,
    filter: state.filter
  };
};
const mapDispatchToProps = {
    getFilter,
    closeFilter,
    showSearchModal,
    resetFilter
  };

  export default withAuth(connect(mapStateToProps, mapDispatchToProps)(FilterTab));