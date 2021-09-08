import React from "react";
import { Link } from "react-router-dom";

import "./navItem.scss";

export interface NavItemProps {
    title: string,
    active: boolean,
    link: string,
}

const NavItem = ({ title, active, link }: NavItemProps) => {
    return (
        <div className={"navItem"}>
            <Link className={`navTitle ${active ? "navTitleActive" : ""}`} to={link}>{title}</Link>
            {active&&<div className={"navTitleUnderline"}/>}
        </div>
    );
};

export default NavItem;
