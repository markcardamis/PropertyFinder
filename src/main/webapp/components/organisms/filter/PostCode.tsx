import React, { ReactNode } from "react";
import "./filter.scss";
import PropTypes from "prop-types";

import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import TextInput from "../../atoms/textInput/TextInput";

export interface PostCodeProps {
    value: string;
    onChange: () => void;
    showValidation: boolean;
    icon: ReactNode;
    title22: string;
}

export const PostCode = ({ value, onChange, showValidation, icon, title22 }: PostCodeProps) => {
    return <>
            <div className='postCode'>
                <PropListTitle title22={title22} icon={icon}/>
                <TextInput value={value} width={"50%"} onChange={onChange}/>
            </div>
            <div className='validation'>{showValidation && "*must be 4 digits"}</div>
            </>;
};