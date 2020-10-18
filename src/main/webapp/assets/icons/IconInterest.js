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
      <path fill={props.color || "#42B67A"}  d="M6.418 10.5h1.164V9.332H6.418zM7 1.168A5.835 5.835 0 001.168 7 5.835 5.835 0 007 12.832 5.835 5.835 0 0012.832 7 5.835 5.835 0 007 1.168zm0 10.5A4.673 4.673 0 012.332 7 4.673 4.673 0 017 2.332 4.673 4.673 0 0111.668 7 4.673 4.673 0 017 11.668zM7 3.5a2.33 2.33 0 00-2.332 2.332h1.164c0-.64.527-1.164 1.168-1.164.64 0 1.168.523 1.168 1.164 0 1.168-1.75 1.023-1.75 2.918h1.164c0-1.313 1.75-1.457 1.75-2.918A2.33 2.33 0 007 3.5zm0 0"></path>
      </g>
    </svg>
  );
}

export default Icon;
