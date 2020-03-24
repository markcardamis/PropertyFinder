import React from 'react';
import { Button } from '@material-ui/core';

import { style } from './style';

const LoginBtn = (props) => {
    const classes = style();
    return (
            <Button color='inherit' className={classes.button} fullWidth={false} onClick={props.onClick}>
                {props.title}
            </Button>
         );
    };

export default LoginBtn;
