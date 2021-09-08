import React from "react";

import "./propListItem.scss";
import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import variables from "../../../styles/_variables.module.scss";

export interface PropListItemProps {
    title: string,
    value11: string,
    value14: string,
    value18: string,
    icon: React.ReactNode,
}

const PropListItem = ({ title, value11, value14, value18, icon }: PropListItemProps) => {
    return (
        <div className='propListTitle'>
            <PropListTitle icon={icon} title={title} color={value11 || value14 || value18 ? null : variables.lightGrey}/>
            <div className='propListTitle-value'>
                {value11&&<span className='font11'>{value11}</span>}
                {value14&&<span className='font14'>{value14}</span>}
                {value18&&<span className='font18'>{value18}</span>}
            </div>
        </div>
    );
};

export default PropListItem;
