import React, {Component} from "react";
import styles from "./Mainbody.scss";
import classNames from "classnames/bind";
import Board from "../../part/Board/Board.js";

const cx = classNames.bind(styles);

class Mainbody extends Component{

    render(){

        return (
            <div>
                <div className = {cx("title")}>
                    게시판
                </div>
                <div className = {cx("body")}>
                    <Board />
                </div>
            </div>
        );
    };
};

export default Mainbody;