import React, { Component } from "react";
import styles from "./LoginModal.scss";
import classNames from "classnames/bind";
import ScreenMask from "../../part/ScreenMask/ScreenMask.js";
import { showjoin, hidejoin, hidelogin } from "../../actions/showlogin";
import { joinRequest, loginRequest } from "../../actions/account";
import { connect } from "react-redux";

const Materialize = window.Materialize;
const cx = classNames.bind(styles);

class LoginModal extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            id : "",
            pw : "",
            nickname : ""
        };

        this._change = this._change.bind(this);
        this.handlejoin = this.handlejoin.bind(this);
        this._join = this._join.bind(this);
        this._login = this._login.bind(this);
    };

    _change(e){
        const a = {};
        a[e.target.name] = e.target.value;
        this.setState(a);
    };

    handlejoin(){
        this.props.joinrequest()
    };

    _join(){
        this.props.realjoin(this.state.id, this.state.pw, this.state.nickname).then(
            () => {
                if(this.props.joinstate.status === "SUCCESS"){
                    this.props.hidejoin();
                    this.setState({
                        id : "",
                        pw : "",
                        nickname : ""
                    })
                }
                else if(this.props.joinstate.status === "FAILED"){
                    if(this.props.joinstate.code === 1){
                        Materialize.toast("ID의 형식이 올바르지 않습니다.", 2000);
                    }
                    else if(this.props.joinstate.code === 2){
                        Materialize.toast("ID가 존재합니다.", 2000);
                    }
                    else if(this.props.joinstate.code === 3){
                        Materialize.toast("닉네임이 존재합니다.", 2000);
                    }
                };
            }
        )
    };

    _login(){
        this.props.reallogin(this.state.id, this.state.pw).then(
            () => {
                if(this.props.loginstate.status === "SUCCESS"){

                    let nick = this.props.session;

                    let logindata = {
                        isLoggedin : true,
                        nickname : nick
                    };
                    
                    document.cookie = JSON.stringify(logindata);
                    
                    Materialize.toast(`${this.props.session}님 로그인 되었습니다`, 2000);

                    this.props.hidelogg();

                }else if(this.props.loginstate.status === "FAILED"){
                    if(this.props.loginstate.code === 1){
                        Materialize.toast("ID가 존재하지 않습니다.", 2000);
                    }
                    else if(this.props.loginstate.code === 2){
                        Materialize.toast("비밀번호가 틀렸습니다.", 2000);
                    }
                };
            }
        );
    };

    render(){
        const login = (
            <div className = {cx("login-wrapper")}>
                <div className = {cx("login-header")}>
                    BigRaptor Board
                </div>
                <div className = {cx("login-input")}>
                    <div className = "input-field col s6">
                        <input 
                            name = "id" 
                            type="text" 
                            className="validate"
                            value = {this.state.id}
                            onChange = {this._change} 
                        />
                        <label className = {cx("input-label")}>아이디</label>
                    </div>
                    <div className = "input-field col s6">
                        <input 
                            name = "pw" 
                            type="password" 
                            className="validate"
                            value = {this.state.pw}
                            onChange = {this._change}  
                        />
                        <label>비밀번호</label>
                    </div>
                    <div className = {cx("login-button")} onClick = {this._login}>
                        로그인
                    </div>
                </div>
                <div className = {cx("footer-wrapper")}>
                    <div className = {cx("footer")}>
                        Do you want to write at my board? <span className = {cx("join-us")} onClick = {this.handlejoin}>Join us!</span>
                    </div>
                </div>
            </div>
        );

        const join = (
            <div className = {cx("login-wrapper")}>
                <div className = {cx("login-header")}>
                    Welcome BigRaptor!
                </div>
                <div className = {cx("login-input")}>
                    <div className = "input-field col s6">
                        <input 
                            name = "id" 
                            type="text" 
                            className="validate"
                            value = {this.state.id}
                            onChange = {this._change} 
                        />
                        <label className = {cx("input-label")}>아이디</label>
                    </div>
                    <div className = "input-field col s6">
                        <input 
                            name = "pw" 
                            type="password" 
                            className="validate"
                            value = {this.state.pw}
                            onChange = {this._change}  
                        />
                        <label>비밀번호</label>
                    </div>
                    <div className = "input-field col s6">
                        <input 
                            name = "nickname" 
                            type="text" 
                            className="validate"
                            value = {this.state.nickname}
                            onChange = {this._change} 
                        />
                        <label className = {cx("input-label")}>닉네임</label>
                    </div>
                    <div className = {cx("login-button")} onClick = {this._join}>
                        회원가입
                    </div>
                </div>
            </div>
        );

        return(
            <div>
                <ScreenMask>
                    {this.props.showjoinstatus ? join : login}
                </ScreenMask>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showjoinstatus : state.showlogin.show_join,
        joinstate : state.account.join,
        loginstate : state.account.login,
        session : state.account.session.nickname
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        joinrequest : () => {
            return dispatch(showjoin())
        },
        realjoin : (id, pw, nickname) => {
            return dispatch(joinRequest(id, pw, nickname))
        },
        hidejoin : () => {
            return dispatch(hidejoin())
        },
        reallogin : (id, pw) => {
            return dispatch(loginRequest(id, pw))
        },
        hidelogg : () => {
            return dispatch(hidelogin());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);