import * as React from "react";

function SvgIconSlider(props) {
  return (
    <svg width={32} height={32} fill="none" {...props}>
      <rect
        x={1}
        y={1}
        width={30}
        height={30}
        rx={15}
        fill="#3D485A"
        stroke="#fff"
        strokeWidth={2}
      />
    </svg>
  );
}

export default SvgIconSlider;
