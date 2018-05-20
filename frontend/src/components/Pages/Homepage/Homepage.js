import React, {Component} from "react";
import styles from "./Homepage.scss";
import classNames from "classnames/bind";
import HomepageTemplate from "../../Templates/HomepageTemplate/HomepageTemplate.js";
import LoginModal from "../../Organism/LoginModal/LoginModal.js";
import { connect }from "react-redux";

const cx = classNames.bind(styles);

class Homepage extends Component{
    render(){
        return(
                <div className = {cx("wrapper")}>
                    <div>
                        <HomepageTemplate />
                        {this.props.showlogin ? <LoginModal /> : ""}
                    </div>
                </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        showlogin : state.showlogin.show
    };
};

export default connect(mapStateToProps)(Homepage);