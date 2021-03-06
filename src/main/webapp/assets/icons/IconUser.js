import * as React from "react";

function SvgIconUser(props) {
  return (
    <svg width={20} height={22} fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.286 5.5C4.286 8.533 6.849 11 10 11c3.15 0 5.714-2.467 5.714-5.5S13.151 0 10 0C6.85 0 4.286 2.467 4.286 5.5zm1.428 0c0-2.275 1.923-4.125 4.286-4.125 2.363 0 4.286 1.85 4.286 4.125S12.363 9.625 10 9.625c-2.363 0-4.286-1.85-4.286-4.125zM.714 22h18.572a.7.7 0 00.714-.688V16.58c0-.71-.377-1.378-.985-1.744-5.359-3.219-12.667-3.22-18.03.001A2.044 2.044 0 000 16.58v4.733A.7.7 0 00.714 22zm17.857-1.375H1.43V16.58c0-.24.12-.461.312-.577 4.909-2.95 11.613-2.947 16.517 0a.671.671 0 01.313.577v4.045z"
        fill="#757575"
      />
    </svg>
  );
}

export default SvgIconUser;
