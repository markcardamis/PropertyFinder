
import React from "react";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "rc-slider/assets/index.css";
import "rc-dropdown/assets/index.css";

import { ZONES } from "../../../shared/constants/zones";
import "./filter.scss";
import DeviderLine from "../../atoms/deviderLine/DeviderLine";
import ButtonOutlined from "../../atoms/buttonOutlined/ButtonOutlined";
import ButtonFilled from "../../atoms/buttonFilled/ButtonFilled";
import { IconArea, IconFsr, IconLandval, IconPrice, IconPriceM, IconZone, IconPost, IconLandOnly, IconNearBy, IconFence } from "../../../assets/icons";
import { getFilter, resetFilter } from "../../../store/actions/filterAction";
import { closeFilter } from "../../../store/actions/filterModalAction";
import { showSearchModal } from "../../../store/actions/searchModalAction";
import { showSearchArea } from "../../../store/actions/searchAreaBtnAction";
import { FilterLine } from "./FilterLine";
import { PostCode } from "./PostCode";
import { ZoneSelect } from "../../molecules/zoneSelect/ZoneSelect";
import { CheckboxFilterLine } from "../../molecules/checkboxFilterLine/CheckboxFilterLine";
import variables from "../../../styles/_variables.module.scss";

const maxZones = 5;
class FilterTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            zone: this.props.filter.zone,
            showValidation: false,
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
        this.setState({ showValidation: true });
      } else {
        this.setState({ showValidation: false });
        await this.props.getFilter(this.props.filter);
        this.props.handleSubmit();
        this.props.closeFilter();
        this.props.showSearchArea();
      }
    }

    onSelect = ({ key }) => {
      const newZoneValue = this.props.filter.zone.length < maxZones ? [...this.props.filter.zone, key] : this.props.filter.zone;
      this.props.getFilter({ ...this.props.filter, zone: newZoneValue });
    }

    onDeselect = ({ key }) => {
      const newZoneValue = [...this.props.filter.zone]
      newZoneValue.splice(this.props.filter.zone.indexOf(key), 1)
      this.props.getFilter({ ...this.props.filter, zone: newZoneValue });
    };

    handleSaveFilter = async () => {
      const { postCode } = this.props.filter;
      if (postCode.length !== 4 && postCode.length !== 0) {
        this.setState({ showValidation: true });
      } else {
        this.setState({ showValidation: false });
        await this.props.getFilter(this.props.filter);
        this.props.handleSaveFilter();
    }
  }

    render () {
      const { filter } = this.props;
        return (
            <div className='filterTab'> 
              <div className='filterInputContainer'>
              <ZoneSelect 
                zone={filter.zone} 
                title22={"Zone"} 
                icon={<IconZone/>} 
                onSelect={this.onSelect}
                onDeselect={this.onDeselect}
                multiSelect={maxZones}
                />
              <PostCode 
                title22={"Post Code"} 
                icon={<IconPost/>} 
                value={filter.postCode} 
                showValidation={this.state.showValidation} 
                onChange={(event)=>this.props.getFilter({ ...filter, postCode: event.target.value })}
                />
              <DeviderLine/>
                <FilterLine 
                  title22={"Area"} 
                  icon={<IconArea/>} 
                  value={filter.area} 
                  step={100} 
                  showCurrency={false}
                  onChange={val=>this.props.getFilter({ ...filter, area: val })} 
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
                  onChange={(val)=>this.props.getFilter({ ...filter, floorspaceRatio: val })} 
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
                  onChange={(val)=>this.props.getFilter({ ...filter, price: val })} 
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
                  onChange={(val)=>this.props.getFilter({ ...filter, priceM2: val })} 
                  min={1} 
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
                  onChange={(val)=>this.props.getFilter({ ...filter, priceLandvalue: val })} 
                  min={0} 
                  max={10} 
                  labelMin={"0.0"} 
                  labelMax={"10.0"}
                  />
                <FilterLine 
                  title22={"Street Frontage"} 
                  icon={<IconFence />} 
                  value={filter.streetFrontage} 
                  step={0.1} 
                  showCurrency={false}
                  onChange={(val)=>this.props.getFilter({ ...filter, streetFrontage: val })} 
                  min={0} 
                  max={50} 
                  labelMin={"0.0"} 
                  labelMax={"50.0+"}
                  />

                <div className="checkboxLine"> 
                    <CheckboxFilterLine 
                      title='Land Only' 
                      icon={<IconLandOnly/>}
                      value={filter.landOnly} 
                      onClick={()=>this.props.getFilter({ ...filter, landOnly: !filter.landOnly })}
                      style={{ paddingRight: "5px" }}
                      />
                    <CheckboxFilterLine 
                      title='Include nearby DA' 
                      icon={<IconNearBy color={variables.darkGrey} />}
                      value={filter.nearbyDA} 
                      onClick={()=>this.props.getFilter({ ...filter, nearbyDA: !filter.nearbyDA })}
                      style={{ paddingLeft: "5px" }}
                      />
                </div>

                </div> 
                 <div className='filterBtnContainer'>
                  <ButtonOutlined title={"Reset filter"} onClick={this.props.resetFilter} style={{ width: "22%" }} titleStyle={{ color: variables.green }} />
                  <ButtonOutlined title={"Save preferences"} onClick={this.handleSaveFilter} style={{ width: "22%" }} />
                  <ButtonFilled title={"Search"} onClick={this.handleSubmit} style={{ width: "53%" }} />
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
    resetFilter,
    showSearchArea
  };

FilterTab.propTypes = {
  resetFilter: PropTypes.func,
  getFilter: PropTypes.func,
  handleSubmit: PropTypes.func,
  closeFilter: PropTypes.func,
  showSearchArea: PropTypes.func,
  handleSaveFilter: PropTypes.func,
  filter: PropTypes.object,
  auth: PropTypes.object
};

  export default withAuth(connect(mapStateToProps, mapDispatchToProps)(FilterTab));