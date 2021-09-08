import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./toggleWidget.scss";
import { IconMap, IconList2 } from "../../../assets/icons";
import variables from "../../../styles/_variables.module.scss";
import Switch from "react-switch";

export interface ToggleWidgetProps {
    onRightClick: () => void;
    onLeftClick: () => void;
    leftValue: string;
    rightValue: string;
    activeButton: string;
}

const ToggleWidget = ({ onRightClick, onLeftClick, leftValue, rightValue, activeButton }: ToggleWidgetProps) => {
    const [ button, setButton ] = useState(activeButton);
    const searchModal = useSelector(state=>state.searchModal);
    const handleClickLeft = () => {
        onLeftClick();
        setButton(leftValue);
    };
    const handleClickRight = () => {
        onRightClick();
        setButton(rightValue);
    };
    return (
    <>
        <div className="toggleWidget">
            <div 
                className={`toggleWidget-button ${searchModal ? "activeButton" : ""}`}
                onClick={handleClickLeft}
                >
                {leftValue}
                <IconList2 
                    style={{ marginLeft: 15, marginTop: 10 }}
                    size={1.5}
                    color={searchModal ? variables.green : variables.lightGrey}
                />
            </div>
            <div className="toggleWidget-devider"></div>
            <div 
                className={`toggleWidget-button ${!searchModal ? "activeButton" : ""}`}
                onClick={handleClickRight}
                >
                {rightValue}
                <IconMap
                    style={{ marginLeft: 15, marginTop: 6 }}
                    size={1.5}
                    color={!searchModal ? variables.green : variables.lightGrey}
                />
            </div>
        </div>
        <div className="toggleWidgetSwitch">
            <Switch 
                onChange={()=>searchModal ? onRightClick() : onLeftClick()} 
                checked={searchModal ? false : true} 
                offColor={"#080"}
                onColor={"#080"}
                width={200}
                height={80}
                uncheckedIcon={<IconMap color={"#FFFFFF"} size={4} style={{ marginTop: 10, marginLeft: 20 }}/>}
                checkedIcon={<IconList2 color={"#FFFFFF"} size={4} style={{ marginTop: 12, marginLeft: 40 }}/>}
            />
        </div>
    </>
    );
};

export default ToggleWidget;