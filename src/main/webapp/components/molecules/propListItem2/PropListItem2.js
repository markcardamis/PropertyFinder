import React from "react";
import PropTypes from "prop-types";

import "./propListItem2.scss";
import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import variables from "../../../styles/_variables.module.scss";

const PropListItem = props => {
    return (
        <div className='propListTitle2'>
            <div className='propListTitle2-col'>
                <PropListTitle icon={props.icon1} title={props.title1} color={props.value1 || props.value1==0 ? null : variables.lightGrey}/>
                <div className='propListTitle2-value'>{props.value1}</div>
            </div>
            <div className='propListTitle2-col'>
                <PropListTitle icon={props.icon2} title={props.title2} color={props.value2 || props.value2==0 ? null : variables.lightGrey}/>
                <div className='propListTitle2-value'>{props.value2}</div>
            </div>
        </div>
    );
};

PropListItem.propTypes = {
    title1: PropTypes.string,
    value1: PropTypes.any, 
    icon1: PropTypes.any,
    title2: PropTypes.string,
    value2: PropTypes.any, 
    icon2: PropTypes.any
};

export default PropListItem;
