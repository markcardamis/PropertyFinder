import React from "react";
import PropTypes from "prop-types";
import NavItem from "../../atoms/navItem/NavItem";
import { TOP_NAV } from "./nav";
import "./topNavList.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const TopNavList = props => {

    const dispatch = useDispatch();
    const history = useHistory();
    const handleNavClick = (link) => {
        dispatch({ type: "CLOSE_MOBILE_NAV" });
        history.push(link);
    };
    const renderNav = () => {
        return TOP_NAV.map(item=>{
            return <div key={item.id} className='navListItem' onClick={()=>handleNavClick(item.link)}>
                        <NavItem 
                            title={item.title} 
                            link={item.link} 
                            active={props.route == item.link ? true : false} 
                            />
                    </div>;
        });
    };

    return (
        <div className='navList'>
            {renderNav()}
        </div>
    );
};

TopNavList.propTypes = {
    route: PropTypes.string
};

export default TopNavList;
