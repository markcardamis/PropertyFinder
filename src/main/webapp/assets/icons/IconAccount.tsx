import * as React from "react";

function SvgIconAccount({ color }: { color: string }) {
  return (
    <svg width={36} height={36} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 0a4 4 0 00-4 4v28a4 4 0 004 4h28a4 4 0 004-4V4a4 4 0 00-4-4H4zm14 18c-3.15 0-5.714-2.467-5.714-5.5S14.849 7 18 7c3.15 0 5.714 2.467 5.714 5.5S21.151 18 18 18zm9.286 11H8.714A.7.7 0 018 28.312V23.58c0-.71.377-1.378.984-1.743 5.364-3.22 12.673-3.22 18.031 0 .608.365.985 1.033.985 1.743v4.733a.7.7 0 01-.714.687z"
        fill={color || "#3D485A"}
      />
    </svg>
  );
}

export default SvgIconAccount;
