import React from "react";

import "./viewing.scss";
import { IconEye } from "../../../assets/icons";

export interface ViewingProps {
  children: React.ComponentType,
}

const Viewing = ({ children }: ViewingProps) => {
    return (
        <div className='viewing'>
            <IconEye/>
            {children}
        </div>
    );
};

export default Viewing;
