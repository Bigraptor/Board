import React, { Component } from "react";
import styles from "./WritePage.scss";
import classNames from "classnames/bind";
import Header from "../../Organism/Header/Header.js";
import { writeRequest, bringRequest, modifyRequest } from "../../actions/board/index.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const cx = classNames.bind(styles);
const Materialize = window.Materialize;

class WritePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            title : "",
            article : ""
        };

        this._change = this._change.bind(this);
        this._write = this._write.bind(this);
        this._modify = this._modify.bind(this);
    };

    componentDidMount(){
        if(window.location.href.split('/')[4] === "modify"){
            this.props.bringRequest(window.location.href.split('/')[3]).then(
                () => {
                    this.setState({
                        title : this.props.getwrite.title,
                        article : this.props.getwrite.article
                    })
                }
            )
        }
    }

    _change(e){
        const a = {};
        a[e.target.name] = e.target.value;
        this.setState(a);
    };

    _write(){
        this.props.write(this.state.title, this.state.article)
    }

    _modify(){
        this.props.modifyRequest(window.location.href.split('/')[3], this.state.title, this.state.article)
    }

    render(){

        const defaultTitle = (
            <div className = {cx("write-up")}>
                글 작성하기
            </div>
        );

        const modifyTitle = (
            <div className = {cx("write-up")}>
                글 수정하기
            </div>
        );

        const defaultButton = (
            <div className = {cx("write-button")} onClick = {this._write}>
                글쓰기
            </div>
        );

        const modifyButton = (
            <div className = {cx("write-button")} onClick = {this._modify}>
                수정
            </div>
        );

        return (
            <div className = {cx("wrapper")}>
                <div className = {cx("content")}>
                    <div>
                        <Header />
                    </div>
                    <div className = {cx("write-body")}>
                        {this.props.match.path === "/board" ? defaultTitle : modifyTitle}
                        <div className = {cx("write-input")}>
                            제목
                            <input name = "title" type = "text" placeholder = "제목을 입력하세요." value = {this.state.title} onChange = {this._change}/>
                            내용
                            <textarea name = "article" value = {this.state.article} onChange = {this._change}/>
                        </div>
                        <div className = {cx("button-wrapper")}>
                            <Link to = "/">
                                {this.props.match.path === "/board" ? defaultButton : modifyButton}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        board : state.board.status,
        getwrite : state.board.getwrite
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        write : (title, article) => {
            return dispatch(writeRequest(title, article));
        },
        bringRequest : (no) => {
            return dispatch(bringRequest(no));
        },
        modifyRequest : (no, title, article) => {
            return dispatch(modifyRequest(no, title, article));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WritePage);