import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Nav from "../nav/Nav";
import { showFilter as showFilterAction, closeFilter } from "../../../store/actions/filterModalAction";
import { closeSignIn, showSignIn } from "../../../store/actions/signInModalAction";
import AuthModal from "../authModal/AuthModal";
import MobileNav from "../mobileNav/MobileNav";
import "./layout.scss";

const Layout = ({ children }: { children: ReactNode[] }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const signInModal = useSelector(state=>state.signInModal);
    const mobileNav = useSelector(state=>state.mobileNav);

    useEffect(()=>{
        history.location.pathname == "/signup" ? dispatch(showSignIn()) : dispatch(closeSignIn());
        history.location.pathname === "/search" ? dispatch(showFilterAction()) : dispatch(closeFilter());
      }, []);


    return (
        <div className='layout'>
            <Nav/>
            {signInModal && <AuthModal/>}
            {mobileNav && <MobileNav/>}
            {children}
        </div>
    );
};

export default Layout;
