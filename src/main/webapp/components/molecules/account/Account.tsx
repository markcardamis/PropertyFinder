import React from "react";

import { IconExit, IconSettings } from "../../../assets/icons";
import "./account.scss";
import PropListTitle from "../../atoms/propListTitle/PropListTitle";

export interface AccountProps {
    onAccountClick: () => void,
    onLogout: () => void,
}

const Account = ({ onAccountClick, onLogout }: AccountProps) => {
    return (
        <>
            <div className='authModalAccount-btn' onClick={onAccountClick}>
                <PropListTitle icon={<IconSettings/>} title16={"Account Setting"}/>
            </div>
            <div className='authModalAccount-btn' onClick={onLogout}>
                <PropListTitle icon={<IconExit/>} title16={"Logout"}/>
            </div>
        </>
    );
};

export default Account;
