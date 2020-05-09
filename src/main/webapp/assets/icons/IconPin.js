import * as React from "react";

function SvgIconPin(props) {
  return (
    <svg width={42} height={42} fill="none" {...props}>
      <g filter="url(#IconPin_svg__filter0_d)">
        <rect x={4} width={34} height={34} rx={17} fill="#3D485A" />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.878 7.001l.04-.001.04.001c3.178.049 5.763 2.603 5.763 5.694 0 3.779-4.153 7.605-5.803 8.976-.11-.091-.232-.195-.363-.308l-.002-.002-.004-.003c-1.827-1.578-5.434-5.141-5.434-8.663 0-3.091 2.586-5.645 5.763-5.694zm.095 8.075c1.677 0 3.037-1.322 3.037-2.953 0-1.63-1.36-2.952-3.037-2.952-1.677 0-3.036 1.322-3.036 2.952 0 1.631 1.36 2.953 3.036 2.953zM14 24.176C14 26.03 17.521 27 21 27s7-.97 7-2.824c0-1.328-1.806-2.202-4.108-2.592-.436.427-.849.803-1.211 1.118 2.523.25 4.015 1.018 4.015 1.474 0 .548-2.163 1.555-5.696 1.555s-5.695-1.007-5.695-1.555c0-.446 1.43-1.196 3.865-1.46-.359-.312-.768-.684-1.2-1.107-2.236.4-3.97 1.266-3.97 2.567z"
        fill="#fff"
      />
      <defs>
        <filter
          id="IconPin_svg__filter0_d"
          x={0}
          y={0}
          width={42}
          height={42}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default SvgIconPin;
