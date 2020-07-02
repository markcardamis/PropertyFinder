import React from "react";
import './iconMenuMobile.scss'

function Icon() {
  const handleClick = (el) => {
    document.getElementById('navIcon').classList.toggle('open');
  }
  return (
      <div id="navIcon" onClick={handleClick}>
        <span/>
        <span/>
        <span/>
        <span/>
      </div>
  );
}

export default Icon;
