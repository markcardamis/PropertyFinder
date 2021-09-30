import React, { useEffect } from "react";
import { connect } from "react-redux";

import { WatchListListItem } from "./WatchListListItem";
import { getWatchList } from "../../../store/actions/watchListAction/getWatchListAction";
import { deleteWatchListItem } from "../../../store/actions/watchListAction/deleteWatchListListItemAction";
import { changeWatchListFrequency } from "../../../store/actions/watchListAction/changeWatchListFrequency";
import { FREQUENCY } from "../../../shared/constants/constants";
import { useAuth } from "../../../hooks/useAuth";

export interface WatchListProps {
  getWatchList: (token: string) => void;
  changeWatchListFrequency: (item: {}) => void;
  deleteWatchListItem: (item: {}) => void;
  watchList: [{}];
}


const WatchList = ({ getWatchList, changeWatchListFrequency, deleteWatchListItem, watchList }: WatchListProps) => {
const { accessToken } = useAuth();

  useEffect(()=>{
    getWatchList(accessToken);
  }, []);

  const handleChangeFrequency = async (item) => {
    const getFrequency = () => {
      const startFrequency = item.frequency==null || !item.frequency ? "OFF" : item.frequency;
      const index = FREQUENCY.indexOf(startFrequency)<3 ? FREQUENCY.indexOf(startFrequency) + 1 : 0;
      return FREQUENCY[index];
    };
    await changeWatchListFrequency(item, getFrequency());
    getWatchList();
  };

  const handleDeleteItem = async (item) => {
    await deleteWatchListItem(item);
    getWatchList();
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    watchList: state.watchList
  };
};
const mapDispatchToProps = {
  getWatchList,
  deleteWatchListItem,
  changeWatchListFrequency
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);

