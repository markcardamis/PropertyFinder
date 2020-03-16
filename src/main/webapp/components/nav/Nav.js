import React, {useEffect, useState} from 'react'; 
import {Link} from 'react-router-dom';
import { AppBar, Button, Toolbar, Container } from '@material-ui/core';
//import { withStyles } from '@material-ui/core/styles';
import { withAuth } from '@okta/okta-react';

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

        // if ( auth === null ) return null;
        // const button = authenticated ?
        //   <button className='loginButton' onClick={() => {props.auth.logout();}}>Logout</button> : 
        //   <button className='loginButton' onClick={() => {props.auth.login();}}>Login</button>;


   
    
        return (
            <div>
                {console.log(props)}
                <AppBar position="static" className={classes.appbar}>
                    <Container maxWidth={false}>
                        <Toolbar className={classes.toolbar}>
                            <Link className={classes.title} to='/'>Property Fetch</Link>
                            <Button color='inherit' fullWidth={false}>
                                <Link to='/login' className={classes.button}>Login</Link>
                            </Button>
                            {/* {button} */}
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    };

//export default withStyles(style)(Nav);
export default withAuth(Nav);
