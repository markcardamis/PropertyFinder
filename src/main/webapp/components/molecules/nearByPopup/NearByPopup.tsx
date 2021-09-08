import React from "react";

import "./nearByPopup.scss";

export interface NearByPopupProps {
    title: string, 
    url: string, 
    description: string, 
    date: string,
}

export const NearByPopup = ({ title, url, description, date }: NearByPopupProps) => {
    return (
        <div className="nerbyDAPopup">
            <a href={url} target="_blank" rel="noopener noreferrer" >{title}</a>
            <div>on {date} applied for </div>
            <div>{description}</div>
        </div>
    );
};