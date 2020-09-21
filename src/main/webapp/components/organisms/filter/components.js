import React from "react";
import "./filter.scss";
import PropTypes from "prop-types";
import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import Slider from "../../atoms/slider/Slider";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";
import { ZONES } from "../../../shared/constants";
import { IconArD } from "../../../assets/icons";
import TextInput from "../../atoms/textInput/TextInput";

export const FilterLine = (props) => {
    return <div className='filterLine'>
                <PropListTitle title22={props.title22} icon={props.icon}/>
                <Slider
                    value={props.value}
                    onChange={props.onChange}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    labelMin={props.labelMin}
                    labelMax={props.labelMax}
                    showCurrency={props.showCurrency}
                    />
            </div>;
};

FilterLine.propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    labelMin: PropTypes.string,
    labelMax: PropTypes.string,
    showCurrency: PropTypes.bool,
    icon: PropTypes.any,
    title22: PropTypes.string
};

export const PostCode = (props) => {
    return <>
            <div className='postCode'>
                <PropListTitle title22={props.title22} icon={props.icon}/>
                <TextInput value={props.value} width={"42%"} onChange={props.onChange}/>
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

export const ZoneSelect = (props) => {
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
    const menu = <Menu onSelect={props.onSelect}>
                    {renderZones()}
                </Menu>;
    return <div className='zoneSelect'>
                <PropListTitle title22={props.title22} icon={props.icon}/>
                <Dropdown trigger={[ "click" ]} overlay={menu} animation="slide-up">
                    <div className='zoneSelectBtn'>
                        <div className='zoneSelectText'>
                            {props.zone&&<div className='zoneColor' style={{ backgroundColor: props.zoneColor }}/>}
                            {props.zone || "Select"}
                        </div>
                        <IconArD/>
                    </div>
                </Dropdown>
            </div>;
};

ZoneSelect.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    icon: PropTypes.any,
    title22: PropTypes.string,
    zone: PropTypes.string,
    zoneColor: PropTypes.string
};