import React from "react";

function Icon(props) {
  const size = 22*props.size ||22
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}pt`}
      height={`${size}pt`}
      viewBox={`0 0 ${size} ${size}`}
    >
      <g transform={`scale(${props.size||1})`}>
        <path d="M21.695 6.586L11.34.098a.646.646 0 00-.68 0L.305 6.586A.639.639 0 000 7.133c0 .222.113.43.305.547l10.355 6.445a.624.624 0 00.34.098.624.624 0 00.34-.098L21.695 7.68A.639.639 0 0022 7.133a.639.639 0 00-.305-.547zm0 0"></path>
        <path d="M21.695 10.453l-1-.625-8.672 5.39c-.304.192-.66.294-1.023.294-.363 0-.719-.102-1.027-.293l-8.668-5.39-1 .624A.639.639 0 000 11c0 .223.113.43.305.547l10.355 6.445a.624.624 0 00.34.098.624.624 0 00.34-.098l10.355-6.445A.639.639 0 0022 11a.639.639 0 00-.305-.547zm0 0"></path>
        <path d="M21.695 14.32l-1-.625-8.672 5.39c-.304.192-.66.294-1.023.294-.363 0-.719-.102-1.027-.293l-8.668-5.39-1 .624a.639.639 0 00-.305.547c0 .223.113.43.305.547l10.355 6.488A.624.624 0 0011 22a.624.624 0 00.34-.098l10.355-6.488a.639.639 0 00.305-.547.639.639 0 00-.305-.547zm0 0"></path>
      </g>
    </svg>
  );
}

export default Icon;
