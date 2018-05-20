import React, { Component } from "react";
import styles from "./HomepageTemplate.scss";
import classNames from "classnames/bind";
import Header from "../../Organism/Header/Header.js";
import Mainbody from "../../Organism/Mainbody/Mainbody.js";

const cx = classNames.bind(styles);

class HomepageTemplate extends Component{
    render(){
        return(
            <div className = {cx("template-wrapper")}>
                <Header />
                <Mainbody />
            </div>
        );
    };
};

export default HomepageTemplate;