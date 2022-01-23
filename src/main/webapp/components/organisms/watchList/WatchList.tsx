import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WatchListListItem } from "./WatchListListItem";
import { getWatchList } from "../../../store/actions/watchListAction/getWatchListAction";
import { deleteWatchListItem } from "../../../store/actions/watchListAction/deleteWatchListListItemAction";
import { changeWatchListFrequency } from "../../../store/actions/watchListAction/changeWatchListFrequency";
import { FREQUENCY } from "../../../shared/constants/constants";

const WatchList = () => {
const { watchList } = useSelector(state => state.state)
const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getWatchList());
  }, []);

  const handleChangeFrequency = async (item) => {
    const getFrequency = () => {
      const startFrequency = item.frequency==null || !item.frequency ? "OFF" : item.frequency;
      const index = FREQUENCY.indexOf(startFrequency)<3 ? FREQUENCY.indexOf(startFrequency) + 1 : 0;
      return FREQUENCY[index];
    };
    await dispatch(changeWatchListFrequency(item, getFrequency()));
    dispatch(getWatchList());
  };

  const handleDeleteItem = async (item) => {
    await dispatch(deleteWatchListItem(item));
    dispatch(getWatchList());
  };

  const renderData = () => {
    return watchList.map((item, index)=>{
      return <WatchListListItem
              key={index}
              index={index+1}
              onChangeFrequency={()=>handleChangeFrequency(item)}
              onDelete={()=>handleDeleteItem(item)}
              data={item}
            />;
    }
    );
  };

  return (
    <div>
      <ul className='savedFiltersList'>{renderData()}</ul>
    </div>
  );
};

export default WatchList;

