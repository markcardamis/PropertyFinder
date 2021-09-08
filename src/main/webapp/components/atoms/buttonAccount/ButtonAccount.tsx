import React from "react";
import PropTypes from "prop-types";
import "./buttonAccount.scss";
import { IconAccount, IconArD } from "../../../assets/icons";
import { useWindowSize } from "../../../hooks/windowSize";
import variables from "../../../styles/_variables.module.scss";

export interface ButtonAccountProps {
    onClick: () => void,
}

const ButtonAccount = ({ onClick }: ButtonAccountProps) => {
    const size = useWindowSize();
    return (
        <div className='accountBtn' onClick={onClick}>
            <IconAccount color={size.width < 982 ? variables.midGrey : variables.darkGrey}/>
            <div className='accountBtnTitle'>Account</div>
            <div className='accountBtnArrow'>
                <IconArD color={variables.lightGrey}/>
            </div>
        </div>
    );
};

export default ButtonAccount;
