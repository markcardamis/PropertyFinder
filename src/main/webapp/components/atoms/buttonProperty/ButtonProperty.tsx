import React from "react";
import "./buttonProperty.scss";

export interface ButtonPropertyProps {
    title: string,
    url: string
}

const ButtonProperty = ({ title, url }: ButtonPropertyProps) => {
    return (
            <a target='_blank' className='buttonProperty' rel="noopener noreferrer" href={url}>
                <div className='buttonPropertyTitle'>
                    {title}
                </div>
            </a>
    );
};

export default ButtonProperty;
