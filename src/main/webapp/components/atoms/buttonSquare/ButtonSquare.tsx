import React from "react";
import "./buttonSquare.scss";

export interface ButtonSquareProps {
    onClick: () => void,
    icon: React.ComponentType,
    style?: React.CSSProperties,
}

const ButtonSquare = ({ onClick, style, icon }: ButtonSquareProps) => {
    return (
        <div className="buttonSquare" onClick={onClick} style={style}>
            {icon}
        </div>
    );
};

export default ButtonSquare;
