import React from 'react';
import PropTypes from 'prop-types';
import './propImg.scss';

const PropImg = props => {
    return (
        <>
            <img src={props.img} className='propImg'/>
        </>
    )
}

PropImg.propTypes = {
    img: PropTypes.string
}

export default PropImg;
