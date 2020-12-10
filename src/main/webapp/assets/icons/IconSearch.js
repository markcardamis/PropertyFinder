import React from "react";

function Icon(props) {
    const size = 22*props.size ||22;
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${size}pt`}
        height={`${size}pt`}
        viewBox={`0 0 ${size} ${size}`}
        >
        <g transform={`scale(${props.size||1})`}>
            <path d="M21.219 17.336l-3.621-3.621c.656-1.317 1.097-2.852 1.097-4.387A9.32 9.32 0 009.367 0 9.317 9.317 0 00.043 9.328a9.316 9.316 0 009.324 9.324c1.535 0 3.074-.437 4.39-1.097l3.622 3.62c1.098 1.098 2.742 1.098 3.84 0a2.857 2.857 0 000-3.84zm-11.852-.879a7.117 7.117 0 01-7.133-7.129 7.118 7.118 0 017.133-7.133c3.95 0 7.133 3.18 7.133 7.133a7.117 7.117 0 01-7.133 7.129zm0 0"></path>
        </g>
        </svg>
    );
}

export default Icon;
