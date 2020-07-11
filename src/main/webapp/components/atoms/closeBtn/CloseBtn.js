import React from 'react';
import './closeBtn.scss';
import {IconClose, IconCloseMobile} from '../../../assets/icons';

const CloseBtn = (props) => {
    
    return (
        <div className='closeBtn' onClick={props.onClick}>
            <div className='iconClose'><IconClose/></div>
            <div className='iconCloseMobile'><IconCloseMobile/></div>
        </div>
    )
}

export default CloseBtn;
