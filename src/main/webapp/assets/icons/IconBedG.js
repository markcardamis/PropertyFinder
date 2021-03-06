import * as React from "react";

function SvgIconBedG(props) {
  return (
    <svg width={14} height={13} fill="none" {...props}>
      <path
        d="M12.36 6.404h-.028V1.92c0-1.06-.736-1.921-1.64-1.921h-7.41C2.376 0 1.64.862 1.64 1.921v4.483C.736 6.404 0 7.266 0 8.325v3.522h1.094V13h1.093v-1.153h9.626V13h1.093v-1.153H14V8.325c0-1.06-.736-1.921-1.64-1.921zM2.733 1.92c0-.353.246-.64.547-.64h7.41c.302 0 .547.287.547.64v4.483H10.2v-.96c0-1.06-.736-1.922-1.64-1.922H5.387c-.905 0-1.64.862-1.64 1.921v.96H2.733V1.922zm6.371 3.522v.96H4.84v-.96c0-.353.245-.64.547-.64h3.172c.301 0 .546.287.546.64zm3.801 5.123H1.094v-2.24c0-.354.245-.641.547-.641h10.718c.302 0 .547.287.547.64v2.242z"
        fill={props.color || "#42B67A"}
      />
    </svg>
  );
}

export default SvgIconBedG;
