import * as types from "./ActionTypes.js";
import axios from "axios";

export function joinRequest(id, pw, nickname){
    return (dispatch) => {
        dispatch(join());

        return axios.post("/account/join", { id, pw, nickname} )
        .then( 
            (response) => { dispatch(joinSuccess()); }
        ).catch(
            (error) => { dispatch(joinFailed(error.response.data.code)); }
        );
    };
};

export function loginRequest(id, pw){
    return (dispatch) => {
        dispatch(login());

        return axios.post("/account/login", { id, pw })
        .then(
            (response) => { dispatch(loginSuccess(response.data.nickname)); }
        ).catch(
            ( error ) => { dispatch(loginFailed(error.response.data.code)) }
        );
    };
};

export function checkSession(){
    return (dispatch) => {
        dispatch(session());

        return axios.get("/account/getinfo").then(
            (response) => {
                dispatch(session_success(response.data.nickname.nickname));
            }
        ).catch(
            (error) => {
                dispatch(session_failed());
            }
        );
    };
};

export function logoutRequest(){
    return (dispatch) => {
        return axios.post("/account/logout").then(
            (response) => {
                dispatch(logout());
            }
        );
    }
};

export function join(){
    return {
        type : types.JOIN
    };
};

export function joinSuccess(){
    return {
        type : types.JOIN_SUCCESS
    };
};

export function joinFailed(error){
    return {
        type : types.JOIN_FAILED,
        error
    };
};

export function login(){
    return {
        type : types.LOGIN
    };
};

export function loginSuccess(nickname){
    return {
        type : types.LOGIN_SUCCESS,
        nickname
    };
};

export function loginFailed(error){
    return {
        type : types.LOGIN_FAILED,
        error
    };
};

export function session(){
    return {
        type : types.CHECK_SESSION
    };
};

export function session_success(nickname){
    return {
        type : types.CHECK_SESSION_SUCCESS,
        nickname
    };
};

export function session_failed(){
    return {
        type : types.CHECK_SESSION_FAILED
    };
};

export function logout(){
    return {
        type : types.LOGOUT
    };
};