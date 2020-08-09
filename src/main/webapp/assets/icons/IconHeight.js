import * as React from "react";

function SvgIconHeight(props) {
  const size = 14*props.size || 14
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`}
      fill="none" 
      {...props}
      >
      <g transform={`scale(${props.size})`}>
        <path
          d="M14 6.391L7 0 0 6.391l.736.808.637-.58v5.74c0 .905.735 1.641 1.639 1.641h7.976c.904 0 1.64-.736 1.64-1.64V6.618l.636.581.736-.808zm-2.465 5.969a.547.547 0 01-.547.546H3.012a.547.547 0 01-.547-.546V5.62L7 1.48l4.535 4.14v6.74zM7.519 5.177v5.097l.597-.598.773.774L7 12.34l-1.889-1.89.773-.774.542.543V5.232l-.542.543L5.11 5 7 3.111l1.889 1.89-.773.774-.597-.598z"
          fill="#42B67A"
        />
      </g>
    </svg>
  );
}

export default SvgIconHeight;
