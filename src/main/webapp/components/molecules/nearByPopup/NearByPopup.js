import React from "react";
import PropTypes from "prop-types";

import "./nearByPopup.scss";

export const NearByPopup = ({ title, url, description, date }) => {
    return (
        <div className="nerbyDAPopup">
            <a href={url} target="_blank" rel="noopener noreferrer" >{title}</a>
            <div>on {date} applied for </div>
            <div>{description}</div>
        </div>
    );
};

NearByPopup.propTypes = {
    title: PropTypes.string, 
    url: PropTypes.string, 
    description: PropTypes.string, 
    date: PropTypes.string,
};