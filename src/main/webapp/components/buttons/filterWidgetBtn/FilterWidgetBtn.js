import React from 'react';
import { Button } from '@material-ui/core';
import { FiFilter } from 'react-icons/fi';

import { style } from './style';

const FilterBtn = (props) => {
    const classes = style();
    return (
            <Button 
                variant='contained' 
                color='secondary' 
                className={classes.filterBtn} 
                disabled={props.disabled}
                onClick={props.onClick}
                >
                    {props.title}
            </Button>
         );
    };

export default FilterBtn;
