import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './navItem.scss';

const NavItem = props => {
    return (
        <div className={'navItem'}>
            <Link className={`navTitle ${props.active ? 'navTitleActive' : ''}`} to={props.link}>{props.title}</Link>
            {props.active&&<div className={'navTitleUnderline'}/>}
        </div>
    )
}

NavItem.propTypes = {
    title: PropTypes.string,
    ative: PropTypes.bool,
    link: PropTypes.string
}

export default NavItem;
