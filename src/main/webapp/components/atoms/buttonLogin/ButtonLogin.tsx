import React from "react";
import "./buttonLogin.scss";

export interface ButtonLoginProps {
    onClick: () => {},
    icon: React.ComponentType,
    title: string,
}

const ButtonLogin = ({ onClick, icon, title }: ButtonLoginProps) => {
    return (
        <div className='login' onClick={onClick}>
            {icon&&<div className='loginIcon'>{icon}</div>}
            <div className='title'>{title || "LOG IN"}</div>
        </div>
    );
};

export default ButtonLogin;
