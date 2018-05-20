import React, { Component } from "react";
import styles from "./Comments.scss";
import classNames from "classnames/bind";
import { connect } from "react-redux";
import { commentRequest } from "../../actions/board";

const cx = classNames.bind(styles);
const Materialize = window.Materialize;

class Comments extends Component{

    constructor(props){
        super(props);

        this.state = {
            contents : ""
        };

        this._change = this._change.bind(this);
        this._comment = this._comment.bind(this);
    };

    _change(e){
        const a = {};
        a[e.target.name] = e.target.value;
        this.setState(a);
    }

    _comment(){
        this.props.commentRequest(window.location.href.split('/')[3], this.state.contents).then(
            () => {
                if(this.props.comment.status === "SUCCESS"){
                    this.setState({
                        contents : ""
                    });
                    Materialize.toast("댓글을 등록하였습니다.", 2000);
                }
                else{
                    Materialize.toast("댓글등록에 실패하였습니다.", 2000);
                }
            }
        )
    }

    render(){

        return(
            <div className = {cx("comment-input")}>
                <div className = {cx("comment-input-wrapper")}>
                    <div className = {cx("comment-input-nickname")}>
                        {this.props.nickname}
                    </div>
                    <textarea name = "contents" value = {this.state.contents} onChange = {this._change}/>
                    <div  className = {cx("button-wrapper")}>
                        <div className = {cx("comment-input-button")} onClick = {this._comment}>
                            등록
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        comment : state.board.comment,
        nickname : state.account.session.nickname
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        commentRequest : (no, contents) => {
            return dispatch(commentRequest(no, contents));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);