import React from "react";
import "./filter.scss";
import PropTypes from "prop-types";
import Menu, { Item as MenuItem } from "rc-menu";
import Dropdown from "rc-dropdown";

import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import { ZONES } from "../../../shared/constants/zones";
import { IconArD } from "../../../assets/icons";

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