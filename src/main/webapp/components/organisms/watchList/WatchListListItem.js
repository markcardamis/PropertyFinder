import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import "../../molecules/savedFiltersListItem/savedFiltersListItem.scss";
import { IconTrash, IconBellOff, IconBell7, IconBell1, IconBell30 } from "../../../assets/icons";

export const WatchListListItem = (props) => {
    const { data } = props;
    const watchList = useSelector(state=>state.watchList);
    const [ frequency, setFrequency ] = useState(data.frequency);

    useEffect(()=>{
      const item = watchList.filter(item=>item.id===data.id);
      setFrequency(item[0].frequency);
    });

    const notificationIcon = frequency=="DAILY"? <IconBell1/> : 
      frequency=="WEEKLY"? <IconBell7/> : frequency=="MONTHLY"? <IconBell30/> : <IconBellOff/>;

    return (
        <div className='savedFilters-filterItem' onClick={props.onSelect}>
          <div className='savedFilters-filterHeader' style={{ display: "flex" }}>
            <div className='savedFilters-filterTitle'>{data.title ? data.title : "Untitled"}</div>
            <div className='savedFilterEdit'>
                <div onClick={props.onChangeFrequency} className='savedFilterEdit-icon'>{notificationIcon}</div>
                <div onClick={props.onDelete}><IconTrash/></div>
            </div>
          </div> 
        </div>
    );
};

WatchListListItem.propTypes = {
  onSelect: PropTypes.func,
  onChangeFrequency: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  data: PropTypes.object
};