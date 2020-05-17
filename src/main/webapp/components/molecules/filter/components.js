import React from 'react'
import './filter.scss'
import PropListTitle from '../../atoms/propListTitle/PropListTitle'
import Slider from '../../atoms/slider/Slider'
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import {TextField, Typography, Button } from '@material-ui/core';
import ButtonOutlined from '../../atoms/buttonOutlined/ButtonOutlined';
import {ZONES} from '../../../shared/constants';
import { IconArD } from '../../../assets/icons';

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
                    />
            </div>
}

export const ZoneSelect = (props) => {
    const renderZones = () => {
        return ZONES.map(item => {
          return <MenuItem key={item.name}>
                    <div className='checkboxWrapper'>
                      <div className='checkbox' style={{backgroundColor: item.color, border: item.color === '#ffffff' ? '1px solid lightgrey' : null}}/>
                      <div>{item.name}</div>
                    </div>
                  </MenuItem>
        })
      }
    const menu = <Menu onSelect={props.onSelect} className='dropdown'>
                    {renderZones()}
                </Menu>
    return <div className='zoneSelect'>
                <PropListTitle title22={props.title22} icon={props.icon}/>
                <Dropdown trigger={['click']} overlay={menu} animation="slide-up">
                    <div className='zoneSelectBtn'>
                        <div className='zoneSelectText'>
                            {props.zone&&<div className='zoneColor' style={{backgroundColor: props.zoneColor}}/>}
                            {props.zone || 'Select'}
                        </div>
                        <IconArD/>
                    </div>
                </Dropdown>
            </div>
}