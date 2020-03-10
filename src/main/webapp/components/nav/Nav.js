import React, {useEffect, useState} from 'react'; 
import {Link} from 'react-router-dom';
import { AppBar, Button, Toolbar, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { style } from './style';

const Nav = (props) => {
    const classes = style();
    const [auth, setAuth] = useState(null);

    const checkAuthentication = async () => {
        const authenticated = await props.auth.isAuthenticated();
        if ( authenticated !== auth ) {
          setAuth(authenticated);
        }
      };

    useEffect(() => {
        checkAuthentication();
    });

    
        return (
            <div>
                {console.log(props)}
                <AppBar position="static" className={classes.appbar}>
                    <Container maxWidth='xl'>
                        <Toolbar className={classes.toolbar}>
                            <Link className={classes.title} to='/'>Property Fetch</Link>
                            <Button color='inherit' fullWidth={false}>
                                <Link to='/login' className={classes.button}>Login</Link>
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    };

export default withStyles(style)(Nav);
