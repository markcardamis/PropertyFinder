import * as React from "react";

function SvgIconMenu(props) {
  return (
    <svg width={26} height={26} fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 0a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V1a1 1 0 00-1-1H1zm0 15a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-9a1 1 0 00-1-1H1zM15 1a1 1 0 011-1h9a1 1 0 011 1v9a1 1 0 01-1 1h-9a1 1 0 01-1-1V1zm1 14a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-9a1 1 0 00-1-1h-9z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgIconMenu;
