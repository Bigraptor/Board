import React, { Component } from "react";
import styles from "./Navmenu.scss";
import classNames from "classnames/bind";
import { loginModal } from "../../actions/showlogin";
import { checkSession, loginRequest, logoutRequest } from "../../actions/account";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Navmenu extends Component{

    constructor(props){
        super(props);
        
        this.showlogin = this.showlogin.bind(this);
        this._logout = this._logout.bind(this);
    };

    componentDidMount(){
        let logindata = document.cookie;
        
        if(logindata === ""){
            return;
        }
        else
        {
            logindata = JSON.parse(logindata);

            if(!logindata.isLoggedin){
                return;
            }else{

            this.props.checkSession().then(
                () => {
                    if(!this.props.ss.valid){
                        logindata = {
                            nickname : ""
                        };

                        document.cookie = JSON.stringify(logindata);
                    };
                }
                )
            };
    }};

    showlogin(){
        this.props.loginview();
    };

    _logout(){
        this.props.logout().then(
            () => {
                console.log(document.cookie)
                let session = document.cookie;
                session = JSON.parse(session);
                console.log(session)
                
                session = {
                    isLoggedin : false,
                    nickname : ""
                };

                document.cookie = JSON.stringify(session);
                window.location.reload();
            }
        )
    };

    render(){

        const menu = (
            <div className = {cx("nav-wrapper")}>
                <div className = {cx("nav-intro")}>
                    소개
                </div>
                <div className = {cx("nav-login")} onClick = {this.showlogin}>
                    로그인
                </div>
            </div>
        );

        const login = (
            <div className = {cx("login-wrapper")}>
                <div className = {cx("login-user")}>
                    {this.props.ss.nickname}님 어서오세요.
                </div>
                <div className = {cx("login-submenu")}>
                    <div className = {cx("submenu-mypage")}>
                        <i className="tiny material-icons">person</i>마이페이지
                    </div>
                    <div className = {cx("submenu-logout")} onClick = {this._logout}>
                        <i className="tiny material-icons">visibility_off</i>로그아웃
                    </div>
                </div>
            </div>
        );

        return(
            <div>
                {this.props.ss.isLoggedin ? login : menu}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        show : state.showlogin.show,
        ss : state.account.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginview : () => {
            return dispatch(loginModal())
        },
        checkSession : () => {
            return dispatch(checkSession());
        },
        logout : () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navmenu);