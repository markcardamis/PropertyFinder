import React, { ReactNode } from "react";
import "./parcelSearch.scss";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";

import Slider from "../../atoms/slider/Slider";
import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import { ZONES } from "../../../shared/constants/zones";
import { IconArD } from "../../../assets/icons";
import TextInput from "../../atoms/textInput/TextInput";

export interface FilterLineProps {
    value: [];
    onChange: () => void;
    min: number;
    max: number;
    step: number;
    labelMin: string;
    labelMax: string;
    showCurrency: boolean;
    icon: ReactNode;
    title22: string;
}

export const FilterLine = ({ title22, icon, value, onChange, max, min, step, labelMin, labelMax, showCurrency }: FilterLineProps) => {
    return <div className='filterLine'>
                <PropListTitle title22={title22} icon={icon}/>
                <Slider
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                    labelMin={labelMin}
                    labelMax={labelMax}
                    showCurrency={showCurrency}
                    style={{ width: "50%" }}
                    />
            </div>;
};

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

export interface ZoneSelectProps {
    value: number;
    onChange: () => void;
    onSelect: () => void;
    icon: ReactNode;
    title22: string;
    zone: string;
    zoneColor: string;
}

export const ZoneSelect = ({ value, onChange, onSelect, icon, title22, zone, zoneColor }: ZoneSelectProps) => {
    const renderZones = () => {
        return ZONES.map(item => {
          return <MenuItem key={item.name}>
                    <div className='checkboxWrapper'>
                      <div className='checkbox' style={{ backgroundColor: item.color, border: item.color === "#ffffff" ? "1px solid lightgrey" : null }}/>
                      <div>{item.label}</div>
                    </div>
                  </MenuItem>;
        });
      };
    const menu = <Menu onSelect={onSelect}>
                    {renderZones()}
                </Menu>;
    return <div className='zoneSelect'>
                <PropListTitle title22={title22} icon={icon}/>
                <Dropdown trigger={[ "click" ]} overlay={menu} animation="slide-up">
                    <div className='zoneSelectBtn'>
                        <div className='zoneSelectText'>
                            {zone&&<div className='zoneColor' style={{ backgroundColor: zoneColor }}/>}
                            {zone || "Select"}
                        </div>
                        <IconArD/>
                    </div>
                </Dropdown>
            </div>;
};