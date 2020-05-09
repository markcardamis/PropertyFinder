import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './navItem.scss';

const NavItem = props => {
    return (
        <>
        <div className={`nav ${props.active ? 'underline' : ''}`}>
            <Link className={`title ${props.active ? 'active' : ''}`} to={props.link}>{props.title}</Link>
        </div>
        </>
    )
}

NavItem.propTypes = {
    title: PropTypes.string,
    ative: PropTypes.bool,
    link: PropTypes.string
}

export default NavItem
