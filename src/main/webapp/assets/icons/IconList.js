import * as React from "react";

function SvgIconList(props) {
  return (
    <svg width={24} height={20} fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2a2 2 0 012-2h16a2 2 0 110 4H6a2 2 0 01-2-2zm6 16a2 2 0 012-2h10a2 2 0 110 4H12a2 2 0 01-2-2zM2 8a2 2 0 100 4h20a2 2 0 100-4H2z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgIconList;
