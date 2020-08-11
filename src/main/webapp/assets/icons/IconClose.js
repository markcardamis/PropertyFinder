import * as React from "react";

function SvgIconClose(props) {
  const size = props.size || 1
  return (
    <svg width={14} height={14} fill="none" {...props}>
      <g transform={`scale(${size})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.48 13.572l-.008-.008L6.927 8.98l-4.399 4.433-.007.008a1.475 1.475 0 01-2.086-.007 1.497 1.497 0 010-2.11l4.399-4.434L.692 2.695a1.497 1.497 0 010-2.11A1.475 1.475 0 012.779.578l.008.008L6.927 4.76 11.214.436l.008-.008a1.475 1.475 0 012.085.008c.58.583.58 1.525.001 2.11L9.02 6.87l4.546 4.584c.579.584.579 1.526 0 2.11a1.475 1.475 0 01-2.087.007z"
          fill="#000"
        />
      </g>
    </svg>
  );
}

export default SvgIconClose;
