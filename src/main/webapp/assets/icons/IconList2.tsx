import React from "react";

function Icon(props) {
  const size = 20*props.size || 20;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={props.style}
    >
      <g transform={`scale(${props.size||1})`}>
        <path fill={props.color||"#000000"} d="M13.3 12.082H3.942a.698.698 0 110-1.395h9.36a.699.699 0 110 1.395zm0 0M13.3 7.7H3.942a.699.699 0 110-1.4h9.36a.699.699 0 110 1.4zm0 0M13.3 3.313H3.942a.699.699 0 110-1.395h9.36a.698.698 0 110 1.395zm0 0M1.875 2.668a.938.938 0 11-1.875 0 .938.938 0 011.875 0zm0 0M1.875 7A.938.938 0 110 7a.938.938 0 011.875 0zm0 0M1.875 11.332a.938.938 0 11-1.875 0 .938.938 0 011.875 0zm0 0"></path>
      </g>
    </svg>
  );
}

export default Icon;
