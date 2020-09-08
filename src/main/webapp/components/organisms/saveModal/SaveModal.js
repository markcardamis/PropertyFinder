import React, { useState } from "react";
import { IconArD } from "../../../assets/icons";
import ButtonFilled from "../../atoms/buttonFilled/ButtonFilled";
import CloseBtn from "../../atoms/closeBtn/CloseBtn";
import TextInput from "../../atoms/textInput/TextInput";
//import { useAuth } from "../../../modules/auth";
import { withAuth } from "@okta/okta-react";
import { saveFilter } from "../../../store/actions/filterAction";
import { connect } from "react-redux";
import "./saveModal.scss";

const SaveModal = async (props) => {
    const [title, setTiltle] = useState("Preferences 1.0");
    //const accessToken = await props.auth.getAccessToken();
    const [frequency, setFrequency] = useState("OFF");
    const [showDropdown, setShowDropdown] = useState(false);
    const frequencyOptions = ["OFF", "DAILY", "WEEKLY", "MONTHLY"];
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
    const handleSaveFilter = async () => {
        props.onSaveClick(title, frequency);
        props.saveFilter(await props.auth.getAccessToken(), title, frequency);
    };

    return (
        <div className='saveModalContainer'>
            <div className='saveModal'>
                <div className='saveModalHeader'>
                    <div />
                    Save Preferences
                    <CloseBtn onClick={props.onCloseClick}/>
                </div>
                <div className='saveModalInput'><TextInput value={title} onChange={(e)=>setTiltle(e.target.value)}/></div>
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
                <ButtonFilled title={"Save"} width={"100%"} onClick={handleSaveFilter}/>
          </div>
        </div>
    );
};

const mapStateToProps = () => {
    return {
    };
};

const mapDispatchToProps = {
    saveFilter
  };
export default withAuth(connect(mapStateToProps, mapDispatchToProps)(SaveModal));