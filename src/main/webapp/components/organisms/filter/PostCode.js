import React from "react";
import "./filter.scss";
import PropTypes from "prop-types";

import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import TextInput from "../../atoms/textInput/TextInput";

export const PostCode = (props) => {
    return <>
            <div className='postCode'>
                <PropListTitle title22={props.title22} icon={props.icon}/>
                <TextInput value={props.value} width={"50%"} onChange={props.onChange}/>
            </div>
            <div className='validation'>{props.showValidation && "*must be 4 digits"}</div>
            </>;
};

PostCode.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    showValidation: PropTypes.bool,
    icon: PropTypes.any,
    title22: PropTypes.string
};