import React, { Component } from "react";
import styles from "./Logo.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

class Logo extends Component{
    render(){
        return(
            <Link to = "/" className = {cx("link")}>
                <div className = {cx("logo")}>
                    BigRaptor
                </div>
            </Link>
        );
    };
};

export default Logo;