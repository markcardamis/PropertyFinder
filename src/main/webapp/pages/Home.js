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
import AuthModal from '../components/organisms/authModal/AuthModal';
import MobileNav from '../components/organisms/mobileNav/MobileNav';
import Layout from '../components/organisms/layout/Layout';
import SearchModal from '../components/organisms/searchModal.js/SearchModal';
import {closeSearchModal, showSearchModal} from '../store/actions/searchModalAction'

const Home = (props) => {
  const dispatch = useDispatch();
  const showFilter = useSelector(state=>state.showFilter);
  const showProperty = useSelector(state=>state.showProperty.isHidden);
  const showSave = useSelector(state=>state.showSaveModal);
  const searchModal = useSelector(state=>state.searchModal)
  const mobileNav = useSelector(state=>state.showMobileNav)

  const toggleFilter = () => {
    showFilter ? dispatch(closeFilter()) : dispatch(showFilterAction())
  }
  const toggleSearch = () => {
    searchModal ? dispatch(closeSearchModal()) : dispatch(showSearchModal());
  }

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
          {!showFilter && !showSave && !searchModal && !mobileNav && <FilterButtonGroup onMenuClick={toggleSearch} onFilterClick = {toggleFilter}/>}
          {showFilter && <FilterModal handleCloseFilter={handleCloseFilter}/>}
          {showSave&&<SaveModal onCloseClick={()=>dispatch(closeSaveModal())} onSaveClick={()=>dispatch(closeSaveModal())}/>}
          {showProperty && !showFilter && <PropertyInformation handleClosePropertyInfo={handleClosePropertyInfo}/>}
          {searchModal&&<SearchModal/>}
          {/* <SearchModal/> */}
          <MapGL/>
        </Layout>
    );
};

export default Home;

