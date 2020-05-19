import React from 'react';
import { useDispatch, useSelector} from 'react-redux';

import PropertyInformation from './organisms/propertyInformation/PropertyInformation';
import FilterModal from './organisms/filterModal/FilterModal';
import SignIn from './widgets/signin/SignIn';
import MapGL from './map/MapGL';
import FilterButtonGroup from './molecules/filterButtonGroup/FilterButtonGroup';
import Nav from './organisms/nav/Nav'
import {showFilter as showFilterAction, closeFilter} from '../store/actions/showFilterAction'
import {closeProperty} from '../store/actions/showPropertyAction'
import {closeSignIn} from '../store/actions/showSignInAction'
import { SaveModal } from './organisms/saveModal/SaveModal';
import {showSaveModal, closeSaveModal} from '../store/actions/showSaveModalAction'


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
        {!showFilter && !showSave && <FilterButtonGroup onMenuClick={()=>{}} onFilterClick = {toggleFilter}/>}
        {showFilter && <FilterModal handleCloseFilter={handleCloseFilter}/>}
        {showSave&&<SaveModal onCloseClick={()=>dispatch(closeSaveModal())} onSaveClick={()=>dispatch(closeSaveModal())}/>}
        {showProperty && !showFilter && <PropertyInformation handleClosePropertyInfo={handleClosePropertyInfo}/>}
        {showSignIn && <SignIn handleCloseSignIn={handleCloseSignIn}/>}
          <MapGL/>
      </>
    );
}

export default Home;

