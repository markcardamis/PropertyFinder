import React from "react";
import "./closeBtn.scss";

import { IconClose, IconCloseMobile } from "../../../assets/icons";

export interface CloseButtonProps {
    onClick: () => void, 
}

const CloseBtn = ({ onClick }: CloseButtonProps) => {
    
    return (
        <div className='closeBtn' onClick={onClick}>
            <div className='iconClose'><IconClose/></div>
            <div className='iconCloseMobile'><IconCloseMobile/></div>
        </div>
    );
};

export default CloseBtn;
