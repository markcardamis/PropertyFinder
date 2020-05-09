import React from 'react'; 
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

import { AppBar, Toolbar, Container } from '@material-ui/core';
import NavItem from '../atoms/navItem/NavItem';
import {IconLogoTitle} from '../../assets/icons';




import { style } from './style';
import './nav.scss';
import ButtonLogin from '../atoms/buttonLogin/ButtonLogin';
import TopNav from '../molecules/topNav/TopNav';


const Nav = (props) => {
    const classes = style();
    const location = useLocation();
    // const showSignIn = useSelector(state=>state.showSignInReducer);

    // const nav = ['Main', 'About', 'Contact'];
    // const renderNav = () => {
    //     return nav.map(item=>{
    //         return <div key={item}>
    //                     <NavItem title={item}/>
    //                 </div>
    //     })
    // }
        return (
             <div className='nav'>
                <IconLogoTitle/>
                <div className='navLinks'>
                    <TopNav route={location.pathname}/>
                    <ButtonLogin/>
                </div>
                {/* <AppBar position="static" className={classes.appbar}>
                    <Container maxWidth={false}>
                        <Toolbar className={classes.toolbar}>
                            <Link className={classes.title} to='/'>Property Fetch</Link>
                        </Toolbar>
                    </Container>
                </AppBar> */}
            </div>
        );
    };

export default Nav;
