import React from 'react';
import {IconButton} from '@material-ui/core';
import { IoMdClose } from 'react-icons/io';
import { withStyles } from '@material-ui/core/styles';

import {style} from './style';

const CloseBtn = (props) => {
    const classes = style();
    return (
        <div className={classes.closeBtn}>
            <IconButton color='primary' onClick={() => props.onClick} className={classes.button}>
                <IoMdClose className={classes.icon}/>
            </IconButton>
        </div>
    )
}

export default withStyles(style)(CloseBtn);
