import React from 'react'; 
import {Link} from 'react-router-dom';
import { AppBar, Toolbar, Container } from '@material-ui/core';
import NavItem from '../atoms/navItem/NavItem';
import {IconLogoTitle} from '../../assets/icons';




import { style } from './style';

const Nav = (props) => {
    const classes = style();
    const nav = ['Main', 'About', 'Contact'];
    const renderNav = () => {
        return nav.map(item=>{
            return <div key={item}>
                        <NavItem title={item}/>
                    </div>
        })
    }
        return (
            <div>
                {/* <IconLogoTitle/>
                <div>
                    {renderNav()}
                </div>
                */}
                <AppBar position="static" className={classes.appbar}>
                    <Container maxWidth={false}>
                        <Toolbar className={classes.toolbar}>
                            <Link className={classes.title} to='/'>Property Fetch</Link>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    };

export default Nav;
