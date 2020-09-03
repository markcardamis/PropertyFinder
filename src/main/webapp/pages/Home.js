import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory} from 'react-router-dom';

import PropertyInformation from '../components/organisms/propertyInformation/PropertyInformation';
import FilterModal from '../components/organisms/filterModal/FilterModal';
import MapGL from '../components/organisms/map/MapGL';
import FilterButtonGroup from '../components/molecules/filterButtonGroup/FilterButtonGroup';
import Nav from '../components/organisms/nav/Nav';
import {showFilter as showFilterAction, closeFilter} from '../store/actions/filterModalAction';
import {closeProperty} from '../store/actions/propertyModalAction';
import {closeSignIn, showSignIn} from '../store/actions/signInModalAction';
import Layout from '../components/organisms/layout/Layout';
import SearchModal from '../components/organisms/searchModal/SearchModal';

const Home = (props) => {
  const dispatch = useDispatch();
  const filterModal = useSelector(state=>state.filterModal);
  const propertyModal = useSelector(state=>state.propertyModal.isHidden);
  const showSave = useSelector(state=>state.showSaveModal);
  const searchModal = useSelector(state=>state.searchModal);

  const handleCloseFilter = () => {
    dispatch(closeFilter())
  } 

  const handleClosePropertyInfo = () => {
    dispatch(closeProperty())
}

  const handleCloseSignIn = () => {
    dispatch(closeSignIn())
}

    return (
      <Layout>
          {filterModal && <FilterModal handleCloseFilter={handleCloseFilter}/>}
          {showSave&&<SaveModal onCloseClick={()=>dispatch(closeSaveModal())} onSaveClick={()=>dispatch(closeSaveModal())}/>}
          {!filterModal && propertyModal && <PropertyInformation handleClosePropertyInfo={handleClosePropertyInfo}/>}
          {searchModal&&<SearchModal/>}
          <MapGL/>
      </Layout>
    );
};

export default Home;

