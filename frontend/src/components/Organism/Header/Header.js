import React, { Component } from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import Logo from "../../part/Logo/Logo.js";
import Navmenu from "../../part/Navmenu/Navmenu.js";

const cx = classNames.bind(styles);

class Header extends Component{
    render(){
        return(
            <div className = {cx("header-wrapper")}>
                <div className = {cx("logo-wrapper")}>
                    <Logo />
                </div>
                <div className = {cx("nav-wrapper")}>
                    <Navmenu />
                </div>
            </div>
        );
    };
};

export default Header;