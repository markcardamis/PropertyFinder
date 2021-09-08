import React from "react";

import "./propListItem2.scss";
import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import variables from "../../../styles/_variables.module.scss";

export interface PropListItem2Props {
        title1: string,
        value1: number,
        icon1: React.ReactNode,
        title2: string,
        value2: number, 
        icon2: React.ReactNode,
}

const PropListItem = ({ icon1, icon2, title1, title2, value1, value2 }: PropListItem2Props) => {
    return (
        <div className='propListTitle2'>
            <div className='propListTitle2-col'>
                <PropListTitle icon={icon1} title={title1} color={value1 || value1 == 0 ? null : variables.lightGrey}/>
                <div className='propListTitle2-value'>{value1}</div>
            </div>
            <div className='propListTitle2-col'>
                <PropListTitle icon={icon2} title={title2} color={value2 || value2==0 ? null : variables.lightGrey}/>
                <div className='propListTitle2-value'>{value2}</div>
            </div>
        </div>
    );
};

export default PropListItem;
