import React from "react";
import "./buttonFilled.scss";

export interface ButtonFilledProps {
    title: string,
    onClick: () => void,
    style?: React.CSSProperties,
}

const ButtonFilled = ({ onClick, title, style }: ButtonFilledProps) => {
    return (
            <div className='buttonFilled' onClick={onClick} style={style}>
                <div className='buttonFilledTitle'>{title}</div>
            </div>
    );
};

export default ButtonFilled;
