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


const Home = (props) => {
  const dispatch = useDispatch();
  const showFilter = useSelector(state=>state.showFilter)
  const showSignIn = useSelector(state=>state.showSignIn)
  const showProperty = useSelector(state=>state.showProperty.isHidden)

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
        {!showFilter && <FilterButtonGroup onMenuClick={()=>{}} onFilterClick = {toggleFilter}/>}
        {showFilter && <FilterModal handleCloseFilter={handleCloseFilter}/>}
        {showProperty && !showFilter && <PropertyInformation handleClosePropertyInfo={handleClosePropertyInfo}/>}
        {showSignIn && <SignIn handleCloseSignIn={handleCloseSignIn}/>}
        <MapGL/>
      </>
    );
}

export default Home;

