import React from "react";

import variables from "../../../styles/_variables.module.scss";
import "./propListTitle.scss";

export interface PropListTitleProps {
    icon: React.ReactNode,
    title: string,
    title16: string,
    title22: string,
    color: string,
    style?: React.CSSProperties,
}

const PropListTitle = ({ icon, title, title16, title22, color, style }: PropListTitleProps) => {
    return (
        <div className='propListTitle' style={style}>
            {icon&&<span className='propListTitle-icon'>{icon}</span>}
            {title&&<div className='propListTitle-text' style={{ color: color || variables.darkGrey }}>{title}</div>}
            {title16&&<div className='propListTitle16-text' style={{ color: color || variables.midGrey }}>{title16}</div>}
            {title22&&<div className='propListTitle-text22' style={{ color: color || variables.darkGrey }}>{title22}</div>}
        </div>
    );
};

export default PropListTitle;
