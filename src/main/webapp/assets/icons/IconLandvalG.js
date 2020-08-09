import * as React from "react";

function SvgIconLandvalG(props) {
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
          d="M5.877 8.083h3.85c1.109.013 2.17.36 3.072 1.002L14 9.943V8.602l-.565-.403a6.483 6.483 0 00-1.822-.91c.125-.223.197-.48.197-.753V4.573l.366.332.737-.805L8.406 0 3.9 4.1l.737.806.365-.333v1.963c0 .23.051.447.142.643a1.54 1.54 0 00-.616.618L2.79 6.095a1.631 1.631 0 00-1.165-.468 1.633 1.633 0 00-1.155.49A1.623 1.623 0 000 7.278c.004.437.179.847.492 1.153l4.058 3.972c.53.518 1.231.804 1.974.804H14v-1.09H6.524c-.454 0-.883-.176-1.208-.493L1.258 7.652a.541.541 0 01-.008-.77.544.544 0 01.774-.008l2.624 2.568.005-.005c.1.132.221.25.362.345.147.1.44.277.737.331.168.031 3.077.339 4.32.47l.115-1.085a461.25 461.25 0 01-4.24-.458 1.11 1.11 0 01-.316-.16.436.436 0 01.246-.797zm2.53-6.607l2.31 2.102v2.958c0 .25-.205.454-.456.454H6.55a.456.456 0 01-.455-.454V3.578l2.31-2.102z"
          fill={props.color || "#42B67A"}
        />
      </g>
    </svg>
  );
}

export default SvgIconLandvalG;
