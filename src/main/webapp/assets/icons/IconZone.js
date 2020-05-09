import * as React from "react";

function SvgIconZone(props) {
  return (
    <svg width={24} height={24} fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.723 1.89l6.91-1.862 7.738 1.996v8.922l-1.748-1.648V3.443L15.51 2.125v5.733l-1.748 1.447V2.137l-5.156 1.39V21.12l.545-.235-.021 2.059-1.395.277L0 21.226V0l7.723 1.89zM1.748 19.807l5.112 1.319V3.543L1.748 2.292v17.515z"
        fill="#3D485A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 10l6.5 6.391-.684.808-.59-.58v5.74c0 .905-.683 1.641-1.523 1.641h-7.406c-.84 0-1.522-.736-1.522-1.64v-5.742l-.591.581-.684-.808L17.5 10zm2.775 12c.28 0 .507-.272.507-.574v-5.805L17.5 12.414l-3.282 3.207v5.805c0 .302.227.574.507.574h5.55z"
        fill="#3D485A"
      />
    </svg>
  );
}

export default SvgIconZone;
