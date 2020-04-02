import React from 'react'; 
import {Link} from 'react-router-dom';
import { AppBar, Toolbar, Container } from '@material-ui/core';

import { style } from './style';

const Nav = (props) => {
    const classes = style();
        return (
            <div>
                {console.log(props)}
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
