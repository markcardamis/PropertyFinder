import React from 'react';
import { useDispatch, useSelector} from 'react-redux';

import PropertyInformation from '../components/organisms/propertyInformation/PropertyInformation';
import FilterModal from '../components/organisms/filterModal/FilterModal';
import MapGL from '../components/organisms/map/MapGL';
import FilterButtonGroup from '../components/molecules/filterButtonGroup/FilterButtonGroup';
import Nav from '../components/organisms/nav/Nav';
import {showFilter as showFilterAction, closeFilter} from '../store/actions/showFilterAction';
import {closeProperty} from '../store/actions/showPropertyAction';
import {closeSignIn} from '../store/actions/showSignInAction';
import { SaveModal } from '../components/organisms/saveModal/SaveModal';
import {showSaveModal, closeSaveModal} from '../store/actions/showSaveModalAction';
import AuthModal from '../components/organisms/authModal/AuthModal';

const Home = (props) => {
  const dispatch = useDispatch();
  const showFilter = useSelector(state=>state.showFilter)
  const showSignIn = useSelector(state=>state.showSignIn)
  const showProperty = useSelector(state=>state.showProperty.isHidden)
  const showSave = useSelector(state=>state.showSaveModal)

  const toggleFilter = () => {
    showFilter ? dispatch(closeFilter()) : dispatch(showFilterAction())
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
      <>
        <Nav/>
        {showSignIn && <AuthModal/>}
        {!showFilter && !showSave && <FilterButtonGroup onMenuClick={()=>{}} onFilterClick = {toggleFilter}/>}
        {showFilter && <FilterModal handleCloseFilter={handleCloseFilter}/>}
        {/* <FilterModal handleCloseFilter={handleCloseFilter}/> */}
        {/* {showSave&&<SaveModal onCloseClick={()=>dispatch(closeSaveModal())} onSaveClick={()=>dispatch(closeSaveModal())}/>} */}
        {showProperty && !showFilter && <PropertyInformation handleClosePropertyInfo={handleClosePropertyInfo}/>}
        {/* {showSignIn && <SignIn handleCloseSignIn={handleCloseSignIn}/>} */}
          <MapGL/>
      </>
    );
}

export default Home;

