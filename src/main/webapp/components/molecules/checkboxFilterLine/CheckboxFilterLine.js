import React from 'react'

import { Checkbox } from '../../atoms/checkbox/Checkbox'
import PropListTitle from '../../atoms/propListTitle/PropListTitle'
import "./checkboxFilterLine.scss"

export const CheckboxFilterLine = ({title, icon, value, onClick}) => {
    return (
        <div className="checkboxFilterLine">
            <PropListTitle title22={title} icon={icon}/>
            <div className="checkboxContainer">
                <Checkbox 
                    value={value}
                    onClick={onClick}
                    />
            </div>
        </div>
    )
}
