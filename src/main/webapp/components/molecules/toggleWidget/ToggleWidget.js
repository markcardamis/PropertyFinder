import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./toggleWidget.scss";
import { IconMap, IconList2 } from "../../../assets/icons";
import variables from "../../../styles/_variables.scss";
import Switch from "react-switch";

const ToggleWidget = (props) => {
    const [ activeButton, setActiveButton ] = useState(props.activeButton);
    const searchModal = useSelector(state=>state.searchModal);
    const handleClickLeft = () => {
        props.onLeftClick();
        setActiveButton(props.leftValue);
    };
    const handleClickRight = () => {
        props.onRightClick();
        setActiveButton(props.rightValue);
    };
    return (
    <>
        <div className="toggleWidget">
            <div 
                className={`toggleWidget-button ${searchModal ? "activeButton" : ""}`}
                onClick={handleClickLeft}
                >
                {props.leftValue}
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
                {props.rightValue}
                <IconMap
                    style={{ marginLeft: 15, marginTop: 6 }}
                    size={1.5}
                    color={!searchModal ? variables.green : variables.lightGrey}
                />
            </div>
        </div>
        <div className="toggleWidgetSwitch">
            <Switch 
                onChange={()=>searchModal ? props.onRightClick() : props.onLeftClick()} 
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

ToggleWidget.propTypes = {
    onRightClick: PropTypes.func,
    onLeftClick: PropTypes.func,
    leftValue: PropTypes.string,
    rightValue: PropTypes.string,
    activeButton: PropTypes.string
  };

export default ToggleWidget;