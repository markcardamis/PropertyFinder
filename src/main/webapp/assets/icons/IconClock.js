import React from "react";

function Icon(props) {
  const size = 14*props.size || 14
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
      >
      <g transform={`scale(${props.size||1})`}>
        <path fill={props.color || "#42B67A"} d="M6.996 1.168A5.829 5.829 0 001.168 7a5.829 5.829 0 005.828 5.832A5.836 5.836 0 0012.832 7a5.836 5.836 0 00-5.836-5.832zM7 11.668a4.668 4.668 0 110-9.336 4.668 4.668 0 010 9.336zm0 0"></path>
        <path fill={props.color || "#42B67A"} d="M7.293 4.082h-.875v3.5l3.062 1.84.438-.719-2.625-1.558zm0 0"></path>
      </g>
    </svg>
  );
}

export default Icon
