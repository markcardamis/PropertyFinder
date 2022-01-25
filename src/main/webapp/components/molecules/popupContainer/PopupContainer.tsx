import React, { PropsWithChildren } from "react";

import "./popupContainer.scss";

export interface PopupContainerProps {
    style?: React.CSSProperties,
    tipStyle?: React.CSSProperties,
}

const PopupContainer = ({ children, style, tipStyle }: PropsWithChildren<PopupContainerProps>) => {
    return (
        <div className='popupContainer' style={style}>
            <div className='popupContainerTop' style={tipStyle}/>
            <div className='popupContainerTopInner'/>
            {children}
        </div>
    );
};

export default PopupContainer;


