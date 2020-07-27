import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory} from 'react-router-dom';

import PropertyInformation from '../components/organisms/propertyInformation/PropertyInformation';
import FilterModal from '../components/organisms/filterModal/FilterModal';
import MapGL from '../components/organisms/map/MapGL';
import FilterButtonGroup from '../components/molecules/filterButtonGroup/FilterButtonGroup';
import Nav from '../components/organisms/nav/Nav';
import {showFilter as showFilterAction, closeFilter} from '../store/actions/showFilterAction';
import {closeProperty} from '../store/actions/showPropertyAction';
import {closeSignIn, showSignIn} from '../store/actions/showSignInAction';
import Layout from '../components/organisms/layout/Layout';
import SearchModal from '../components/organisms/searchModal.js/SearchModal';

const Home = (props) => {
  const dispatch = useDispatch();
  const showFilter = useSelector(state=>state.showFilter);
  const showProperty = useSelector(state=>state.showProperty.isHidden);
  const showSave = useSelector(state=>state.showSaveModal);
  const searchModal = useSelector(state=>state.searchModal)

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
          {showFilter && <FilterModal handleCloseFilter={handleCloseFilter}/>}
          {showSave&&<SaveModal onCloseClick={()=>dispatch(closeSaveModal())} onSaveClick={()=>dispatch(closeSaveModal())}/>}
          {!showFilter && showProperty && <PropertyInformation handleClosePropertyInfo={handleClosePropertyInfo}/>}
          {searchModal&&<SearchModal/>}
          <MapGL/>
      </Layout>
    );
};

export default Home;

