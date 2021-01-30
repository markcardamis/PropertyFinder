import React from "react";
import PropTypes from "prop-types";
import variables from "../../../styles/_variables.scss";
import "./propListTitle.scss";

const PropListTitle = props => {
    return (
        <div className='propListTitle' style={props.style}>
            {props.icon&&<span className='propListTitle-icon'>{props.icon}</span>}
            {props.title&&<div className='propListTitle-text' style={{ color: props.color || variables.darkGrey }}>{props.title}</div>}
            {props.title16&&<div className='propListTitle16-text' style={{ color: props.color || variables.midGrey }}>{props.title16}</div>}
            {props.title22&&<div className='propListTitle-text22' style={{ color: props.color || variables.darkGrey }}>{props.title22}</div>}
        </div>
    );
};

PropListTitle.propTypes = {
    icon: PropTypes.any,
    title: PropTypes.string,
    title16: PropTypes.string,
    title22: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.object
};

export default PropListTitle;
