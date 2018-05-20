import React, {Component} from "react";
import styles from "./Boardwrites.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import moment from "moment";

const cx = classNames.bind(styles);

class Boardwrites extends Component{

    render(){

        const dateToFormat = 'YYYY-MM-DD hh:mm:ss';
        const date = moment(this.props.created).format(dateToFormat);

        return (
            <div className = {cx("board")}>
                <div className = {cx("board-wrapper")}>
                    <div className = {cx("board-no")}>
                        {this.props.no}
                    </div>
                    <div className = {cx("board-title")}>
                        <Link to = {"/"+this.props.no}>
                            <div className = {cx("title")}>
                                {this.props.title}
                            </div>
                        </Link>
                        <div className = {cx("comments-count")}>
                            [{this.props.comment}]
                        </div>
                    </div>
                    <div className = {cx("board-writer")}>
                        {this.props.writer}
                    </div>
                    <div className = {cx("board-created")}>  
                        {date}
                    </div>
                </div>
            </div>
        );
    };
};

export default Boardwrites;