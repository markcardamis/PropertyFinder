import * as React from "react";

function SvgIconAreaG(props) {
  const size = 14*props.size || 14;
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`}
      fill="none" 
      {...props}
      >
      <g transform={`scale(${props.size||1})`}>
        <path
          d="M12.11 10.22l-.772.773.597.598H9.328L12.9 8.017v1.445l1.093 1.094V1.529A1.53 1.53 0 0012.464 0H3.415l1.093 1.093h1.499L2.408 4.694V2.085l.597.598.773-.773L1.889.02 0 1.91l.773.773.542-.543v9.015a1.53 1.53 0 001.528 1.529h9.038l-.543.543.773.773L14 12.11l-1.89-1.89zm-4.327 1.37H6.254L12.9 4.943v1.529l-5.116 5.12zM2.408 9.276l8.177-8.181h1.542l-9.719 9.723V9.275zM12.9 1.867v1.529L4.71 11.59H3.181l9.718-9.723zm-5.347-.774H9.04L2.41 7.728V6.24l5.143-5.147z"
          fill={props.color || "#42B67A"}
        />
      </g>
    </svg>
  );
}

export default SvgIconAreaG;
