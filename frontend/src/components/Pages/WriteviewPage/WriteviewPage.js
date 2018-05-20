import React, { Component } from "react";
import styles from "./WriteviewPage.scss";
import classNames from "classnames/bind";
import Header from "../../Organism/Header/Header.js";
import { bringRequest, deleteRequest, getComment } from "../../actions/board";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Comments from "../../part/Comments/Comments.js";
import CommentsList from "../../part/CommentsList/CommentsList.js";
import LoginModal from "../../Organism/LoginModal/LoginModal.js";

const cx = classNames.bind(styles);

class WriteviewPage extends Component{

    constructor(props){
        super(props);

        this._delete = this._delete.bind(this);
    }

    componentDidMount(){
        this.props.bringRequest(this.props.match.params.no);
        this.props.getComment(this.props.match.params.no);
    };

    _delete(){
        this.props.deleteRequest(this.props.match.params.no).then(
            () => {
                return <Redirect to = "/" />
            }
        )
    };

    render(){

        const list = (
            <Link to = "/">
                <div className = {cx("list")}>
                    목록
                </div>
            </Link>
        );

        const login = (
            <div className = {cx("buttonbox")}>
                <Link to = {this.props.location.pathname + "/modify"}>
                    <div className = {cx("modify")}>
                        수정
                    </div>
                </Link>
                <div className = {cx("delete")} onClick = {this._delete}>
                    삭제
                </div>
                {list}
            </div>
        );

        const notlogin = (
            <div className = {cx("buttonbox")}>
                    {list}
            </div>
        );

        const dateFormat = "YYYY-MM-DD hh:mm:ss";
        const date = moment(this.props.getwrite.created).format(dateFormat);

        const commentsMapping = this.props.comment.write.map(( a ) => {
            return <CommentsList key = {a._id} writer = {a.writer} contents = {a.contents} created = {a.created} />
        });

        return (
            <div>
                <div className = {cx("wrapper")}>
                    <div className = {cx("view")}>
                        <div>
                            <Header />
                        </div>
                        <div className = {cx("view-article")}>
                            <div className = {cx("titlebox")}>
                                <div className = {cx("title")}>
                                    {this.props.getwrite.title}
                                </div>
                                <div className = {cx("subbox")}>
                                    <div className = {cx("writer")}>
                                        {this.props.getwrite.writer}
                                    </div>
                                    <div className = {cx("date")}>
                                        {date}
                                    </div>
                                </div>
                            </div>
                            <div className = {cx("body")}>
                                {this.props.getwrite.article}
                            </div>
                            <div className = {cx("footer")}>
                                {this.props.nickname === this.props.getwrite.writer ? login : notlogin}
                            </div>
                            <div className = {cx("comment")}>
                                <div className = {cx("comment-title")}>
                                    댓글
                                </div>
                                <div className = {cx("comment-list")}>
                                    {commentsMapping}
                                </div>
                                {this.props.session ? <div><Comments /><br /></div> : ""}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {this.props.showlogin ? <LoginModal /> : ""}
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        getwrite : state.board.getwrite,
        session : state.account.session.isLoggedin,
        nickname : state.account.session.nickname,
        comment : state.board.comment,
        showlogin : state.showlogin.show
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        bringRequest : (no) => {
            return dispatch(bringRequest(no));
        },
        deleteRequest : (no) => {
            return dispatch(deleteRequest(no));
        },
        getComment : (no) => {
            return dispatch(getComment(no));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteviewPage);