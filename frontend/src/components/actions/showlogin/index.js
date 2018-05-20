import * as types from "./ActionTypes.js";

export function loginModal(){
    return {
        type : types.LOGIN_MODAL
    }
}

export function hidelogin(){
    return {
        type : types.HIDE_LOGIN
    }
};

export function showjoin(){
    return {
        type : types.SHOW_JOIN
    };
};

export function hidejoin(){
    return {
        type : types.HIDE_JOIN
    };
};