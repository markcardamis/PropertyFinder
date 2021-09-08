import React from "react";

import "./savedFilterItem.scss";

export interface SavedFilterItemProps {
    value: number,
    title: string,
    position: string,
    icon: React.ComponentType,
}

const SavedFilterItem = ({ value, title, position, icon }: SavedFilterItemProps) => {
    return (
        <>
        {value ? <div className='savedFilterItem'>
            {icon}
            <div className='savedFilterItemTitle'>{title}</div>
            <div className='savedFilterItemValue'>{value}</div>
            {position!=="last" && <div className='savedFilterItemDevider'/>}
        </div> : null}
        </>
    );
};

export default SavedFilterItem;
