import * as React from "react";

function SvgIconFsrG(props) {
  const size = 14*props.size || 14
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
          d="M14 1.64v5.743c0 .905-.736 1.64-1.64 1.64h-.93V7.93h.93a.547.547 0 00.546-.547V4.457h-1.449v.547h-1.094V2.816h1.094v.547h1.45V1.641a.547.547 0 00-.548-.547H7.93v2.27h.548v1.093H6.289V3.363h.547v-2.27H5.332V0h7.027C13.264 0 14 .736 14 1.64zM7.93 6.345H6.836v6.015a.547.547 0 01-.547.547h-.902V14h.902c.905 0 1.64-.736 1.64-1.64V9.022h1.56V7.93h-1.56V6.344zm-4.075.574H1.094V1.641c0-.302.245-.547.547-.547h.957V0H1.64C.736 0 0 .736 0 1.64v10.72C0 13.263.736 14 1.64 14h.985v-1.094h-.984a.547.547 0 01-.547-.547V8.012h2.761v.52H4.95V6.343H3.855v.574z"
          fill={props.color || "#42B67A"}
        />
      </g>
    </svg>
  );
}

export default SvgIconFsrG;
