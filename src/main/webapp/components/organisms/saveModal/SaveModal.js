import React, {useState} from 'react';
import './saveModal.scss';
import CloseBtn from '../../atoms/closeBtn/CloseBtn';
import TextInput from '../../atoms/textInput/TextInput';
import Switch from "react-switch";
import ButtonFilled from '../../atoms/buttonFilled/ButtonFilled';

export const SaveModal = (props) => {
    const [title, setTiltle] = useState('Preferences 1.0')
    const [checked, setChecked] = useState(true)
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
                    <Switch onChange={()=>setChecked(!checked)} checked={checked} checkedIcon={false} uncheckedIcon={false} onColor={'#42B67A'}/>
                </div>
                <ButtonFilled title={'Save'} width={'100%'} onClick={props.onSaveClick}/>
          </div>
        </div>
    )
}
