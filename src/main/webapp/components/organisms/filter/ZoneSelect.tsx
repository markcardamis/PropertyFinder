import React, { ReactNode } from "react";
import "./filter.scss";

import Menu, { Item as MenuItem } from "rc-menu";
import Dropdown from "rc-dropdown";

import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import { ZONES } from "../../../shared/constants/zones";
import { IconArD } from "../../../assets/icons";

export interface ZoneSelectProps {
  onSelect: ({ key }: { key: string }) => void;
  icon: ReactNode;
  title22: string;
  zone: string;
  zoneColor: string;
}

export const ZoneSelect = ({ 
  onSelect,
  icon,
  title22,
  zone,
  zoneColor
}: ZoneSelectProps) => {
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
                            {zone && <div className='zoneColor' style={{ backgroundColor: zoneColor }}/>}
                            {zone || "Select"}
                        </div>
                        <IconArD/>
                    </div>
                </Dropdown>
            </div>;
};