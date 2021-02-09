import React from "react";
import PropTypes from "prop-types";

import { Checkbox } from "../../atoms/checkbox/Checkbox";
import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import "./checkboxFilterLine.scss";

export const CheckboxFilterLine = ({ title, icon, value, onClick, style }) => {
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

CheckboxFilterLine.propTypes = {
    title: PropTypes.string, 
    icon: PropTypes.node, 
    value: PropTypes.bool, 
    onClick: PropTypes.func,
    style: PropTypes.object
  };
