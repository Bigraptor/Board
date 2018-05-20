import React, { Component } from "react";
import styles from "./CommentsList.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class CommentsList extends Component{
    render(){
        return (
            <div className = {cx("wrapper")}>
                <div className = {cx("writer")}>
                    {this.props.writer}
                </div>
                <div className = {cx("contents")}>
                    {this.props.contents}
                </div>
                <div className = {cx("created")}>
                    {this.props.created}
                </div>
                <div className = {cx("button-wrapper")}>
                    <div className = {cx("button")}>
                        답글
                    </div>
                </div>
            </div>
        );
    };
};

export default CommentsList;