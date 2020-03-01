import React from 'react';
import { Button } from '@material-ui/core';
import { FiFilter } from 'react-icons/Fi';

import { style } from './style';

const FilterBtn = (props) => {
    const classes = style();
    return (
        <div>
            <Button 
                variant='contained' 
                color='secondary' 
                className={classes.filterBtn} 
                onClick={() => props.onClick}
                >
                <FiFilter size='2em'/>
            </Button>
        </div>
    );
};

export default FilterBtn;
