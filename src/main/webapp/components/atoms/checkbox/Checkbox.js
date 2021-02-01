import React from "react";

import { IconCheckmark } from "../../../assets/icons";

import "./checkbox.scss";

export const Checkbox = ({ value, onClick }) => {
    return (
        <div 
            className="checkboxContainer"
            onClick={(val)=>onClick(val)}
            >
            {value && <IconCheckmark/>}
        </div>
    );
};
