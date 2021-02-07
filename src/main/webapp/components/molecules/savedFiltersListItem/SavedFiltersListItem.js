import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import "./savedFiltersListItem.scss";
import SavedFilterItem from "../../atoms/savedFilterItem/SavedFilterItem";
import { IconZoneG, IconAreaG, IconPriceG, IconPriceMg, IconLandvalG, IconFsrG, IconPostG, IconPencil, IconTrash, IconBellOff, IconBell7, IconBell1, IconBell30, IconLandOnly } from "../../../assets/icons";

const SavedFiltersListItem = props => {
    const { data } = props;
    const notifications = useSelector(state=>state.notifications);
    const [ frequency, setFrequency ] = useState(data.frequency);

    useEffect(()=>{
      const item = notifications.filter(item=>item.id===data.id);
      setFrequency(item[0].frequency);
    });

    const notificationIcon = frequency=="DAILY"? <IconBell1/> : 
      frequency=="WEEKLY"? <IconBell7/> : frequency=="MONTHLY"? <IconBell30/> : <IconBellOff/>;

    return (
        <div className='savedFilters-filterItem' onClick={props.onSelect}>
          <div className='savedFilters-filterHeader' style={{ display: "flex" }}>
            <div onClick={props.onSelect} className='savedFilters-filterTitle'>{data.title ? data.title : "Untitled"}</div>
            <div className='savedFilterEdit'>
                <div onClick={props.onChangeFrequency} className='savedFilterEdit-icon'>{notificationIcon}</div>
                <div onClick={props.onEdit} className='savedFilterEdit-icon'><IconPencil/></div>
                <div onClick={props.onDelete}><IconTrash/></div>
            </div>
          </div>
          <div onClick={props.onSelect} className={"savedFilters-propertiesList"}>
            <SavedFilterItem title={"Zone: "} value={data.propertyZone} icon={<IconZoneG/>} position={"first"}/>
            <SavedFilterItem title={"Area min: "} value={data.propertyAreaMin} icon={<IconAreaG/>} position={"first"}/>
            <SavedFilterItem title={"Area max: "} value={data.propertyAreaMax} icon={<IconAreaG/>} position={"first"}/>
            <SavedFilterItem title={"Price min: "} value={data.propertyPriceMin} icon={<IconPriceG/>} position={"first"}/>
            <SavedFilterItem title={"Price max: "} value={data.propertyPriceMax} icon={<IconPriceG/>} position={"first"}/>
            <SavedFilterItem title={"Price per m2 min: "} value={data.propertyPricePSMMin} icon={<IconPriceMg/>} position={"first"}/>
            <SavedFilterItem title={"Price per m2 max: "} value={data.propertyPricePSMMax} icon={<IconPriceMg/>} position={"first"}/>
            <SavedFilterItem title={"Post code: "} value={data.propertyPostCode} icon={<IconPostG/>} position={"first"}/>
            <SavedFilterItem title={"Price to landvalue min: "} value={data.propertyPriceToLandValueMin} icon={<IconLandvalG/>} position={"first"}/>
            <SavedFilterItem title={"Price to landvalue max: "} value={data.propertyPriceToLandValueMax} icon={<IconLandvalG/>} position={"first"}/>
            <SavedFilterItem title={"Floorspace ratio min: "} value={data.propertyFloorSpaceRatioMin} icon={<IconFsrG/>} position={"first"}/>
            <SavedFilterItem title={"Floorspace ratio max: "} value={data.propertyFloorSpaceRatioMax} icon={<IconFsrG/>} position={"first"}/>
            <SavedFilterItem title={"Land only: "} value={data.landOnly} icon={<IconLandOnly/>} position={"first"}/>
          </div>   
        </div>
    );
};

SavedFiltersListItem.propTypes = {
  onSelect: PropTypes.func,
  onChangeFrequency: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  data: PropTypes.object
};

export default SavedFiltersListItem;
