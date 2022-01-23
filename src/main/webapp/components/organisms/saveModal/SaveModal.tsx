import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import { IconArD } from "../../../assets/icons";
import ButtonFilled from "../../atoms/buttonFilled/ButtonFilled";
import CloseBtn from "../../atoms/closeBtn/CloseBtn";
import TextInput from "../../atoms/textInput/TextInput";
import { saveFilter } from "../../../store/actions/filterAction";
import { useAuth } from "../../../hooks/useAuth";
import "./saveModal.scss";

export interface SaveModalProps {
    onSaveClick: (title: string, frequency: string) => void;
    onCloseClick: () => void;
}

const SaveModal = ({ onSaveClick, onCloseClick }: SaveModalProps) => {
    const { accessToken } = useAuth();
    const dispatch = useDispatch();
    const [ title, setTiltle ] = useState("Preference 1");
    const [ frequency, setFrequency ] = useState("OFF");
    const [ showDropdown, setShowDropdown ] = useState(false);
    const frequencyOptions = [ "OFF", "DAILY", "WEEKLY", "MONTHLY" ];
    const handleOptionClick = (item) => {
        setFrequency(item);
        setShowDropdown(false);
    };

    const renderOptions = () => {
        return frequencyOptions.map((item, index)=>{
            return <div 
                        key={index}
                        className='dropdown-item'
                        onClick={()=>handleOptionClick(item)}
                    >
                        {item}
                    </div>;
        });
    };
    const handleSaveFilter = () => {
        onSaveClick(title, frequency);
        dispatch(saveFilter(accessToken, title, frequency));
    };

    const handleInput = (e) => {
        const regex = /^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/;
        if (regex.test(e.target.value)&&e.target.value.length<=30) {
            setTiltle(e.target.value);
        } else e.preventDefault;
    };

    return (
        <div className='saveModalContainer'>
            <div className='saveModal'>
                <div className='saveModalHeader'>
                    <div />
                    Save Preferences
                    <CloseBtn onClick={onCloseClick}/>
                </div>
                <div className='saveModalInput'><TextInput value={title} onChange={(e)=>handleInput(e)}/></div>
                <div className='saveModalNote'>Name your saved preferences.</div>
                <div className='saveModalSwitch'>
                    <div>Send a notification as soon as we find a suitable</div>
                    <div className='frequencySelect' onClick={()=>setShowDropdown(!showDropdown)}>
                        <div className='frequencySelectText'>{frequency}</div>
                        <IconArD />
                    </div>
                </div>
                <div className="dropdown-container">
                        {showDropdown&&<div className='dropdown'>
                            {renderOptions()}
                        </div>}
                </div>
                <ButtonFilled title={"Save"} style={{ width: "100%" }} onClick={handleSaveFilter}/>
          </div>
        </div>
    );
};

export default SaveModal;