import React from "react";

function IconLandOnly(props) {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path 
          fill={props.color || "#3D485A"} 
          d="M14 6l-4.22 5.63 1.25 1.67L14 9.33 19 16h-8.46l-4.01-5.37L1 18h22L14 6zM5 16l1.52-2.03L8.04 16H5z"
          >
        </path>
      </svg>
    );
}

export default IconLandOnly;
