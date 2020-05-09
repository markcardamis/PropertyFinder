import React from 'react'; 
import {Link, useLocation} from 'react-router-dom';

import {IconLogoTitle} from '../../assets/icons';
import './nav.scss';
import TopNavList from '../molecules/topNavList/TopNavList';


const Nav = (props) => {
    const location = useLocation();
        return (
             <div className='nav'>
                <Link to='/'><IconLogoTitle/></Link>
                <div className='navLinks'>
                    <TopNavList route={location.pathname}/>
                    <div className='loginLogoutBtn'/>
                </div>
            </div>
        );
    };

export default Nav;