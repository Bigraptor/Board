import React, {Component} from "react";
import styles from "./Board.scss";
import classNames from "classnames/bind";
import Boardwrites from "../Board-writes/Boardwrites.js";
import { Link } from "react-router-dom";
import { loadRequest } from "../../actions/board";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Board extends Component{

    componentDidMount(){
        this.props.loadRequest();
    }

    render(){

        const writebutton = (
                <div className = {cx("write-wrapper")}>
                    <Link to = "/board">
                        <div className = {cx("button-write")}>
                            글쓰기
                        </div>
                    </Link>
                </div>
        );

        const mapping = this.props.loadstatus.write.map( ( a, i ) => {
            
            return (
            <Boardwrites key = {a._id} no = {a.no} title = {a.title} article = {a.article} writer = {a.writer} created = {a.created} comment = {a.comment.length}/>
            );
        } );

        return(
            <div className = {cx("board")}>
                <div className = {cx("board-wrapper")}>
                    <div className = {cx("board-header")}>
                        <div className = {cx("board-header-no")}>
                            글 번호
                        </div>
                        <div className = {cx("board-header-title")}>
                            제목
                        </div>
                        <div className = {cx("board-header-author")}>
                            작성자
                        </div>
                        <div className = {cx("board-header-date")}>
                            날짜
                        </div>
                    </div>
                    <div>
                        {mapping}
                    </div>
                </div>
                <div>
                    {this.props.isLoggedin ? writebutton : ""}
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isLoggedin : state.account.session.isLoggedin,
        loadstatus : state.board.load
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadRequest : () => {
            return dispatch(loadRequest());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);