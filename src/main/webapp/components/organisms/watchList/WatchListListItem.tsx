import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "../../molecules/savedFiltersListItem/savedFiltersListItem.scss";
import { IconTrash, IconBellOff, IconBell7, IconBell1, IconBell30 } from "../../../assets/icons";

export interface WatchListItemProps {
  onChangeFrequency: () => void;
  onDelete: () => void;
  data: { id: string, title: string; frequency: string; }
}

export const WatchListListItem = ({ data, onChangeFrequency, onDelete}: WatchListItemProps) => {
    const watchList = useSelector(state=>state.watchList);
    const [ frequency, setFrequency ] = useState(data.frequency);

    useEffect(()=>{
      const item = watchList.filter(item=>item.id===data.id);
      setFrequency(item[0].frequency);
    });

    const notificationIcon = frequency=="DAILY"? <IconBell1/> : 
      frequency=="WEEKLY"? <IconBell7/> : frequency=="MONTHLY"? <IconBell30/> : <IconBellOff/>;

    return (
        <div className='savedFilters-filterItem'>
          <div className='savedFilters-filterHeader' style={{ display: "flex" }}>
            <div className='savedFilters-filterTitle'>{data.title ? data.title : "Untitled"}</div>
            <div className='savedFilterEdit'>
                <div onClick={onChangeFrequency} className='savedFilterEdit-icon'>{notificationIcon}</div>
                <div onClick={onDelete}><IconTrash/></div>
            </div>
          </div> 
        </div>
    );
};