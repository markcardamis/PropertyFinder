import React from "react";
import "./closeBtn.scss";
import PropTypes from "prop-types";
import { IconClose, IconCloseMobile } from "../../../assets/icons";

const CloseBtn = (props) => {
    
    return (
        <div className='closeBtn' onClick={props.onClick}>
            <div className='iconClose'><IconClose/></div>
            <div className='iconCloseMobile'><IconCloseMobile/></div>
        </div>
    );
};

CloseBtn.propTypes = {
    onClick: PropTypes.func 
};

export default CloseBtn;
