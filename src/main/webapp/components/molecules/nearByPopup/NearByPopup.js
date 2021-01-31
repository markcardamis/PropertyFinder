import React from "react";
import PropTypes from "prop-types";


export const NearByPopup = ({ title, url, description, date }) => {
    return (
        <>
            <a href={url} target="_blank" >{title}</a>
            <div>on {date} applied for </div>
            <div>{description}</div>
        </>
    );
};

NearByPopup.propTypes = {
    title: PropTypes.string, 
    url: PropTypes.string, 
    description: PropTypes.string, 
    date: PropTypes.string,
};