
import React from "react";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "rc-slider/assets/index.css";
import "rc-dropdown/assets/index.css";

import { ZONES } from "../../../shared/constants/zones";
import "./parcelSearch.scss";
import { FilterLine, ZoneSelect, PostCode } from "./components";
import DeviderLine from "../../atoms/deviderLine/DeviderLine";
import ButtonFilled from "../../atoms/buttonFilled/ButtonFilled";
import { IconArea, IconFsr, IconLandval, IconPrice, IconPriceM, IconZone, IconPost } from "../../../assets/icons";
import { resetFilter } from "../../../store/actions/filterAction";
import { closeFilter } from "../../../store/actions/filterModalAction";
import { showSearchModal } from "../../../store/actions/searchModalAction";
import { showSearchArea } from "../../../store/actions/searchAreaBtnAction";
import { setParcelFilter, resetParcelFilter } from '../../../store/actions/parcelSearchAction/setParcelFilter';

const ParcelSearch = (props) => {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         authenticated: false,
    //         zone: this.props.filter.zone,
    //         zoneColor: null,
    //         showValidation: false      
    //     };

    //    this.checkAuthentication();
    // }

//    checkAuthentication = async () => {
//         const authenticated = await this.props.auth.isAuthenticated();
//         if (authenticated !== this.state.authenticated) {
//           this.setState({ authenticated });
//         }
//       }
          
//     componentDidUpdate() {
//         this.checkAuthentication();
//       }

//     handleSubmit = async () => {
//       const { postCode } = this.props.filter;
//       if (postCode.length !== 4 && postCode.length !== 0) {
//         this.setState({ showValidation: true });
//       } else {
//         this.setState({ showValidation: false });
//         await this.props.getFilter(this.props.filter);
//         this.props.handleSubmit();
//         this.props.closeFilter();
//         this.props.showSearchArea();
//       }
//     }

//     onSelect = ({ key }) => {
//       this.props.getFilter({ ...this.props.filter, zone: key });
//       let zoneColor = ZONES.filter(item=>{
//         return item.name===key;
//       });
//       this.setState({ zoneColor: zoneColor[0].color });
//     }

//     handleSaveFilter = async () => {
//       const { postCode } = this.props.filter;
//       if (postCode.length !== 4 && postCode.length !== 0) {
//         this.setState({ showValidation: true });
//       } else {
//         this.setState({ showValidation: false });
//         await this.props.getFilter(this.props.filter);
//         this.props.handleSaveFilter();
//     }
//   }

const { zone, area, buildingHeight, floorspaceRatio, landValue } = props.parcelSearch
const { parcelSearch } = props

const handleSubmit = (val) => {
    console.log(val)
}

        return (
            <div className='filterTab'> 
              <div className='filterInputContainer'>
              {/* <ZoneSelect 
                zone={filter.zone} 
                zoneColor={this.state.zoneColor} 
                title22={"Zone"} 
                icon={<IconZone/>} 
                onSelect={this.onSelect}
                /> */}
              <FilterLine 
                  title22={"Area"} 
                  icon={<IconArea/>} 
                  value={area}
                  step={100} 
                  showCurrency={false}
                  onChange={(val)=>props.setParcelFilter({ ...parcelSearch, area: val })} 
                  min={0} 
                  max={20000} 
                  labelMin={"0"} 
                  labelMax={"20 000+"}
                />
              <DeviderLine/>

                <FilterLine 
                  title22={"Building Height"} 
                  icon={<IconFsr/>} 
                  value={buildingHeight}
                  step={0.1} 
                  showCurrency={false}
                  onChange={(val)=>props.setParcelFilter({ ...parcelSearch, buildingHeight: val })} 
                  min={0} 
                  max={2} 
                  labelMin={"0.0"} 
                  labelMax={"2.0+"}
                  />
          
                <FilterLine 
                  title22={"Floor Space Ratio"} 
                  icon={<IconFsr/>}
                  value={floorspaceRatio}
                  step={0.1} 
                  showCurrency={false}
                  onChange={(val)=>props.setParcelFilter({ ...parcelSearch, floorspaceRatio: val })} 
                  min={0} 
                  max={2} 
                  labelMin={"0.0"} 
                  labelMax={"2.0+"}
                  />
                <DeviderLine/>

                <FilterLine 
                  title22={"Land Value"} 
                  icon={<IconPrice/>}
                  value={landValue}
                  step={10000} 
                  showCurrency={true}
                  onChange={(val)=>props.setParcelFilter({ ...parcelSearch, landValue: val })}
                  min={100000} 
                  max={5000000} 
                  labelMin={"$100k"} 
                  labelMax={"$5M"}
                  />
                {/* <FilterLine 
                  title22={"Street Frontage"} 
                  icon={<IconPriceM/>} 
                  value={filter.priceM2} 
                  step={10} 
                  showCurrency={true}
                  onChange={(val)=>this.props.getFilter({ ...filter, priceM2: val })} 
                  min={0} 
                  max={10000} 
                  labelMin={"$1"} 
                  labelMax={"$10 000+"}
                  /> */}
                {/* <div>Sold in last 6 years</div> */}
                 <div className="resetFilterBtn" onClick={props.resetParcelFilter}>Reset filter</div>
                </div> 
                  <div className='filterBtnContainer'>
                  <div className='btnSavePref'/>
                  <div className='btnSearch'><ButtonFilled title={"Search"} onClick={handleSubmit}/></div>
                </div>
              </div>
        );
    }

const mapStateToProps = (state) => {
  return {
    parcelSearch: state.parcelSearch,
    // filter: state.filter
  };
};
const mapDispatchToProps = {
    setParcelFilter,
    closeFilter,
    showSearchModal,
    resetParcelFilter,
  };

ParcelSearch.propTypes = {
    
};

  export default withAuth(connect(mapStateToProps, mapDispatchToProps)(ParcelSearch));