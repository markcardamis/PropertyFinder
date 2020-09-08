import React from "react";

function Icon(props) {
  const height = 22*props.size;
  const width = 20*props.size;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={`${width}pt`}
      height={`${height}pt`}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter
          id="alpha"
          width="100%"
          height="100%"
          x="0%"
          y="0%"
          filterUnits="objectBoundingBox"
        >
          <feColorMatrix
            in="SourceGraphic"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          ></feColorMatrix>
        </filter>
        <image
          id="image7"
          width="20"
          height="22"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAABmJLR0QA/wD/AP+gvaeTAAABiklEQVQ4je2RT0iUQRjG33meGQcUU7IllhU+2l0S7JCUl8BFUSS6C+sWkUcpRO8iX5Bgx7pFtzI8mHrxsgqih/AUi1AgSH/oEOXhO4gIZcNMh9yIUmE77w/mMLzv/N6Hd0Tq1KlT5xjUnxcTx/DT04WrItc+h3AppdTZxyKppRDa2pX6XhJJ7okkIYTdp0BlDVi/dXi48491q7W1ZZ+8fwP4QsDVcsrk64oxxd8Jx6zNnnGu/DCELEXCC6XefhTZGAU2u73/+gFIDoxJmrw3t51rGw4h1aNUtsP7QkGk76VI+si1gKmpm5ImVwi4HnJ5QOuuWvbV4L2qGFOcJHcIuHdaj8pFYK8bSPTQEP/nE0RE5slBAi4PPJNz5CoBF5HlZq2v1CLSvb26YkzxDvCJgHul9V3JWxvNkNvVJT8h37STk6eJaExnBDzvB3ar7zLArIlj/GrI5ewDrSfGgffVhjlrL5wkzACzBFwD8GOf3HhEXj9x+ojWlzfJgdMS5q2NFo0pfWtsPP937SfyKXxWXZGMiQAAAABJRU5ErkJggg=="
        ></image>
        <mask id="mask0">
          <g filter="url(#alpha)" transform={`scale(${props.size||1})`}>
            <use xlinkHref="#image7"></use>
          </g>
        </mask>
        <clipPath id="clip1">
          <path d="M0 0H20V22H0z"></path>
        </clipPath>
        <g id="surface9" clipPath="url(#clip1)" transform={`scale(${props.size||1})`}>
          <path
            fill="#99500D"
            d="M14.531 22.445c1.719-1.09 5.149-2.87 4.688-2.804-3.282.468-5.469.062-5.469.062l-.625.777zm0 0"
          ></path>
        </g>
      </defs>
      <g transform={`scale(${props.size||1})`}>
        <path
          fill="none"
          stroke="#AF5C0F"
          strokeLinecap="round"
          strokeWidth="3.656"
          d="M27.422 40.213l1.828-3.65"
          transform="scale(.51282 .51163)"
        ></path>
        <path
          fill="#F08A2C"
          d="M9.844 13.094c-4.89 0-9.844 1.508-9.844 4.39 0 1.914 2.188 3.22 5.086 3.883.309.07.656-.07.875-.297.523-.55.172-1.472-.57-1.644-2.27-.531-3.555-1.387-3.555-1.942 0-.851 3.039-2.418 8.008-2.418 4.969 0 8.008 1.567 8.008 2.418 0 .57-1.356 1.453-3.735 1.98-.75.165-1.11 1.09-.582 1.645.215.227.563.368.867.301 3-.644 5.286-1.969 5.286-3.926 0-2.882-4.954-4.39-9.844-4.39zm0 0"
        ></path>
        <use mask="url(#mask0)" xlinkHref="#surface9"></use>
        <path
          fill="#F08A2C"
          d="M14.215 19.652a.937.937 0 00-.309 1.848zm2.504 2.313a.933.933 0 001.078-.77.933.933 0 00-.77-1.074zm-2.813-.465l2.813.465.308-1.844-2.812-.469zm0 0"
        ></path>
        <path
          fill="#000000"
          fillRule="evenodd"
          d="M8.73 18.223c.61.644 1.614.644 2.227 0l5.469-5.75c.285-.301.449-.707.449-1.133V1.598C16.875.718 16.25 0 15.488 0H4.2c-.765 0-1.386.715-1.386 1.598v9.742c0 .426.16.832.449 1.133zm.332-13.375a.795.795 0 00-.78.808v3.23c0 .45.347.81.78.81h1.563c.43 0 .781-.36.781-.81v-3.23c0-.445-.351-.808-.781-.808zm0 0"
        ></path>
      </g>
    </svg>
  );
}

export default Icon;
