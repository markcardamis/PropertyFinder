import React, {useState} from 'react';
import PropTypes from 'prop-types';
import NavItem from '../../atoms/navItem/NavItem';
import {TOP_NAV} from './nav';
import './topNavList.scss';
import {useDispatch} from 'react-redux'

const TopNavList = props => {

    const dispatch = useDispatch();
    const handleNavClick = () => {
        dispatch({type: 'CLOSE_MOBILE_NAV'})
    }
    const renderNav = () => {
        return TOP_NAV.map(item=>{
            return <div key={item.id} className='navListItem' onClick={handleNavClick}>
                        <NavItem 
                            title={item.title} 
                            link={item.link} 
                            active={props.route == item.link ? true : false} 
                            />
                    </div>
        })
    }

    return (
        <div className='navList'>
            {renderNav()}
        </div>
    )
}

TopNavList.propTypes = {
    route: PropTypes.string
}

export default TopNavList;
