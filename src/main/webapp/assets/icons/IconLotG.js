import * as React from "react";

function SvgIconLotG(props) {
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
          d="M5.592 12.57v1.422l-.343-.278a23.01 23.01 0 01-2.592-2.54C.894 9.146 0 7.325 0 5.76v-.155C0 2.515 2.508 0 5.592 0c3.083 0 5.592 2.515 5.592 5.605v.155c0 .132-.007.265-.02.4l-1.094-1a4.511 4.511 0 00-4.478-4.066 4.511 4.511 0 00-4.5 4.511v.155c0 2.642 3.394 5.84 4.5 6.81zm3.355-.785h1.636v-1.64H8.947v1.64zM5.592 3.281a2.324 2.324 0 010 4.649 2.324 2.324 0 010-4.649zm0 1.094a1.23 1.23 0 000 2.461 1.23 1.23 0 000-2.461zm7.673 6.667l-.307-.28v1.755c0 .818-.664 1.483-1.48 1.483H8.025c-.815 0-1.479-.665-1.479-1.483v-1.756l-.307.28-.735-.807 4.248-3.885L14 10.234l-.735.808zm-1.398-1.278L9.75 7.829 7.636 9.764v2.753c0 .215.174.39.388.39h3.455a.389.389 0 00.388-.39V9.764z"
          fill={props.color || "#42B67A"}
        />
      </g>
    </svg>
  );
}

export default SvgIconLotG;
