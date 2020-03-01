import React from 'react'; 
import {Link} from 'react-router-dom';
import { AppBar, Button, Toolbar, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { style } from './style';

const Nav = () => {
    const classes = style();
        return (
            <div>
                <AppBar position="static" className={classes.appbar}>
                    <Container maxWidth='xl'>
                        <Toolbar className={classes.toolbar}>
                            <h1 className={classes.title}>Property Fetch</h1>
                            <Button color='inherit' fullWidth={false}>
                                <Link to='/' className={classes.button}>Home</Link>
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
                
            </div>
        );
    };

export default withStyles(style)(Nav);
