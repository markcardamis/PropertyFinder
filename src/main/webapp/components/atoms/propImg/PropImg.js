import React from "react";
import PropTypes from "prop-types";
import "./propImg.scss";

const PropImg = props => {
    return (
        <>
            <img src={props.img} className='propImg' style={{ height: props.height || 130, width: props.width || "100%" }}/>
        </>
    );
};

PropImg.propTypes = {
    img: PropTypes.string
};

export default PropImg;
