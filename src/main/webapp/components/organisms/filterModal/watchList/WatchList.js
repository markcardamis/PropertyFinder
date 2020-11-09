import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {WatchListListItem} from '../../../organisms/filterModal/watchList/WatchListListItem'
import {getWatchList} from '../../../../store/actions/watchListAction/getWatchListAction'
import {deleteWatchListItem} from '../../../../store/actions/watchListAction/deleteWatchListListItemAction'
import { saveWatchListItem } from '../../../../store/actions/watchListAction/saveWatchListItemAction'
import { FREQUENCY } from '../../../../shared/constants/constants'


const WatchList = (props) => {

  useEffect(()=>{
    props.getWatchList(props.auth.accessToken)
  }, [])

  const handleChangeFrequency = async (item) => {
    const getFrequency = () => {
      const startFrequency = item.frequency==null || !item.frequency ? "OFF" : item.frequency;
      const index = FREQUENCY.indexOf(startFrequency)<3 ? FREQUENCY.indexOf(startFrequency) + 1 : 0;
      return FREQUENCY[index];
    };
    // await this.props.getFilter({ 
    //     frequency: getFrequency(),
    //     zone: item.propertyZone ? item.propertyZone : null,
    //     area: [ item.propertyAreaMin !== 0 ? item.propertyAreaMin : 0, item.propertyAreaMax !== 20000 ? item.propertyAreaMax : 20000 ],
    //     price: [ item.propertyPriceMin !== 100000 ? item.propertyPriceMin : 100000, item.propertyPriceMax !== 5000000 ? item.propertyPriceMax : 5000000 ],
    //     priceM2: [ item.propertyPricePSMMin !== 1 ? item.propertyPricePSMMin : 1, item.propertyPricePSMMax !== 10000 ? item.propertyPricePSMMax : 10000 ],
    //     postCode: item.propertyPostCode !== "" ? item.propertyPostCode : "",
    //     priceLandvalue: [ item.propertyPriceToLandValueMin !== 0 ? item.propertyPriceToLandValueMin : 0, item.propertyPriceToLandValueMax !== 10 ? item.propertyPriceToLandValueMax : 10 ],
    //     floorspaceRatio: [ item.propertyFloorSpaceRatioMin !== 0 ? item.propertyFloorSpaceRatioMin : 0, item.propertyFloorSpaceRatioMax !== 2 ? item.propertyFloorSpaceRatioMax : 2 ]
    //     });
    await props.saveWatchListItem(item, getFrequency(),);
    props.getWatchList();
  }

  const handleDeleteItem = async (item) => {
    await props.deleteWatchListItem(item);
    props.getWatchList();
  }

  const renderData = () => {
    return props.watchList.map((item, index)=>{
      return <WatchListListItem
              key={index}
              index={index+1}
              onChangeFrequency={(e)=>{handleChangeFrequency(item); e.stopPropagation();}}
              onDelete={(e)=>{handleDeleteItem(item); e.stopPropagation();}}
              data={item}
            />;
    }
    );
  }

  return (
    <div>
      <ul className='savedFiltersList'>{renderData()}</ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    watchList: state.watchList
  };
};
const mapDispatchToProps = {
  getWatchList,
  deleteWatchListItem,
  saveWatchListItem
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)

