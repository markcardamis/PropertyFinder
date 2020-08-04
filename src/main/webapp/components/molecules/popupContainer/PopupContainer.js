import React from 'react';
import PropTypes from 'prop-types';

import './popupContainer.scss';

const PopupContainer = props => {
    return (
        <div className='popupContainer' style={props.style}>
            <div className='popupContainerTop'/>
            <div className='popupContainerTopInner'/>
            {props.children}
        </div>
    )
}

PopupContainer.propTypes = {
    children: PropTypes.any
}

export default PopupContainer;


