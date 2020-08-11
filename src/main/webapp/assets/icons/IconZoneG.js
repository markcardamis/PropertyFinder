import * as React from "react";

function SvgIconZoneG(props) {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.505 1.102L8.535.017 13.05 1.18v5.204l-1.019-.961V2.009l-2.982-.77v3.345l-1.02.844V1.247l-3.007.81V12.32l.318-.137-.013 1.2-.814.163L0 12.382V0l4.505 1.102zM1.02 11.554l2.982.77V2.066l-2.982-.73v10.217z"
          fill={props.color || "#42B67A"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.208 5.833L14 9.562l-.4.47-.344-.338v3.35c0 .527-.398.956-.888.956h-4.32c-.49 0-.888-.43-.888-.957V9.694l-.345.339-.399-.471 3.792-3.729zm1.619 7c.163 0 .296-.159.296-.334V9.112l-1.915-1.87-1.915 1.87v3.387c0 .175.133.334.296.334h3.238z"
          fill={props.color || "#42B67A"}
        />
      </g>
    </svg>
  );
}

export default SvgIconZoneG;
