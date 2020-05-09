import React, {useState} from 'react'
import PropTypes from 'prop-types'
import NavItem from '../../atoms/navItem/NavItem'
import {TOP_NAV} from './nav'
import './topNav.scss'

const TopNav = props => {

    const renderNav = () => {
        return TOP_NAV.map(item=>{
            return <div key={item.id} className='navListItem'>
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

TopNav.propTypes = {
    route: PropTypes.string
}

export default TopNav
