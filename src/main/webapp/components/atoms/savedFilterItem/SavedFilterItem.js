import React from "react";
import PropTypes from "prop-types";
import "./savedFilterItem.scss";

const SavedFilterItem = props => {
    return (
        <>
        {props.value ? <div className='savedFilterItem'>
            {props.icon}
            <div className='savedFilterItemTitle'>{props.title}</div>
            <div className='savedFilterItemValue'>{props.value}</div>
            {props.position!=="last" && <div className='savedFilterItemDevider'/>}
        </div> : null}
        </>
    );
};

SavedFilterItem.propTypes = {
    value: PropTypes.number,
    title: PropTypes.string,
    position: PropTypes.string,
    icon: PropTypes.any
};

export default SavedFilterItem;
