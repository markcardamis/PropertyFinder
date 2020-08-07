import React from "react";
import './iconMenuMobile.scss'
import {useSelector} from 'react-redux'

function Icon() {
  const showMobileNav = useSelector(state=>state.mobileNav);
  return (
      <div id="navIcon" className={showMobileNav ? 'open' : ''}>
        <span/>
        <span/>
        <span/>
        <span/>
      </div>
  );
}

export default Icon;
