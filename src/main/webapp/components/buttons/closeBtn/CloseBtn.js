import React from 'react';

import './closeBtn.scss';
import {IconClose} from '../../../assets/icons'

const CloseBtn = (props) => {
    
    return (
        <div className='closeBtn' onClick={props.onClick}>
           <IconClose/>
        </div>
    )
}

export default CloseBtn;
