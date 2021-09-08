import React from "react";

import { Checkbox } from "../../atoms/checkbox/Checkbox";
import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import "./checkboxFilterLine.scss";

export interface CheckboxFilterLineProps {
    title: string, 
    icon: React.ComponentType,
    value: boolean, 
    onClick: () => void,
    style?: React.CSSProperties,
}

export const CheckboxFilterLine = ({ title, icon, value, onClick, style }: CheckboxFilterLineProps) => {
    return (
        <div className="checkboxFilterLine" style={style}>
            <PropListTitle title22={title} icon={icon}/>
            <div className="checkboxContainer">
                <Checkbox 
                    value={value}
                    onClick={onClick}
                    />
            </div>
        </div>
    );
};
