import React from "react";

import "./buttonOutlined.scss";

export interface ButtonOutlinedProps {
    title: string,
    onClick: (e: React.MouseEvent<HTMLElement>) => void,
    style?: React.CSSProperties,
    titleStyle?: React.CSSProperties,
}

const ButtonOutlined = ({ title, onClick, style, titleStyle }: ButtonOutlinedProps) => {
    return (
            <div className='buttonOutlined' onClick={onClick} style={style}>
                <div className='buttonOutlinedTitle' style={titleStyle}>{title}</div>
            </div>
    );
};

export default ButtonOutlined;
