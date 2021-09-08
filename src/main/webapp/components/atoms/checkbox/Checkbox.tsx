import React from "react";
import { IconCheckmark } from "../../../assets/icons";
import "./checkbox.scss";

export interface CheckboxProps {
    value: boolean,
    onClick: () => void,
}

export const Checkbox = ({ value, onClick }: CheckboxProps) => {
    return (
        <div 
            className="checkboxContainer"
            onClick={onClick}
            >
            {value && <IconCheckmark/>}
        </div>
    );
};
