import React from 'react';
import PropTypes from 'prop-types';
import './buttonProperty.scss';

const ButtonProperty = props => {
    return (
            <a target='_blank' className='buttonProperty' rel="noopener noreferrer" href={props.url}>
                <div className='buttonPropertyTitle'>
                    {props.title}
                </div>
            </a>
    );
};

ButtonProperty.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string
};

export default ButtonProperty;
