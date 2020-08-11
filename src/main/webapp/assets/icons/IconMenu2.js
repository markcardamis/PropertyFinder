import * as React from "react";

function SvgIconMenu2(props) {
  const size = 26*props.size
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`}
      fill="none" {...props}
      >
      <g transform={`scale(${props.size||1})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 0a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V1a1 1 0 00-1-1H1zm0 15a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-9a1 1 0 00-1-1H1zM15 2a1 1 0 011-1h9a1 1 0 011 1v1a1 1 0 01-1 1h-9a1 1 0 01-1-1V2zm1 14a1 1 0 00-1 1v1a1 1 0 001 1h9a1 1 0 001-1v-1a1 1 0 00-1-1h-9zm-1-8a1 1 0 011-1h9a1 1 0 011 1v1a1 1 0 01-1 1h-9a1 1 0 01-1-1V8zm1 14a1 1 0 00-1 1v1a1 1 0 001 1h9a1 1 0 001-1v-1a1 1 0 00-1-1h-9z"
          fill="#000000"
        />
      </g>
    </svg>
  );
}

export default SvgIconMenu2;
