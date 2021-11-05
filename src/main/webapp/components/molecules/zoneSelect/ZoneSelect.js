import React, { useEffect, useState } from "react";
import "./zoneSelect.scss";
import PropTypes from "prop-types";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";

import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import { ZONES } from "../../../shared/constants/zones";
import { IconArD } from "../../../assets/icons";

export const ZoneSelect = (props) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [zoneColors, setZoneColors] = useState([])

    useEffect(() => {
      const colors = props.zone.map(item => ZONES.find(zone => zone.name === item)?.color);
      setZoneColors(colors);
    }, [props.zone])


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

    const menu = <Menu
                    onSelect={props.onSelect} 
                    onDeselect={props.onDeselect}
                    multiple={props.multiSelect !== 1} 
                    selectedKeys={props.zone}
                    >
                    {renderZones()}
                </Menu>;

    const renderSelected = () => {
      return props.zone.map((item, index) => {
        const separator = index + 1 !== props.zone.length ? ',' : ''
        return <div className='zoneSelectOption'>
        <div className='zoneSelectColor' style={{ backgroundColor: zoneColors[index] }}/>
        {item}{separator}
        </div>
      })
    }

    return <div className='zoneSelect'>
                <PropListTitle title22={props.title22} icon={props.icon}/>
                <Dropdown
                    trigger={[ "click" ]} 
                    onVisibleChange={setIsDropdownVisible} 
                    overlay={menu} 
                    animation="slide-up" 
                    visible={isDropdownVisible} 
                    closeOnSelect={false}
                    >
                    <div className='zoneSelectBtn'>
                        <div className='zoneSelectOptions'>
                            {props.zone.length ? renderSelected() : "Select (max. 3)"}
                        </div>
                        <IconArD/>
                    </div>
                </Dropdown>
            </div>;
};

ZoneSelect.propTypes = {
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    icon: PropTypes.any,
    title22: PropTypes.string,
    zone: PropTypes.array,
    multiSelect: PropTypes.number
};