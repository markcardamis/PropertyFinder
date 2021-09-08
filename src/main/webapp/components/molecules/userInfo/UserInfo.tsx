import React from "react";
import "./userInfo.scss";
import { IconUser, IconEmail } from "../../../assets/icons";

export interface UserInfoProps {
    user?: {
        name: string;
        email: string;
    }
}
const UserInfo = ({ user }: UserInfoProps) => {
    return (
        <div>
            {user && <div className='userInfoHeader'>User Information</div>}
            {user && <div className='userInfo'>
                <div className='userInfoIcon'><IconUser/></div> 
                {user?.name}
            </div>}
            {user && <div className='userInfo'>
                <div className='userInfoIcon'><IconEmail/></div>
                 {user?.email}
            </div>}
            <div className='userInfoNote'>For changes to your account or lost password please contact us: <a href='mailto:info@propertyfetch.com.au'>info@propertyfetch.com.au</a></div>
        </div>
    );
};

export default UserInfo;
