import * as types from "./ActionTypes.js";
import axios from "axios";

export function writeRequest(title, article){
    return (dispatch) => { 
            dispatch(write());

            return axios.post("/board/write", {title, article}).then(
                (response) => {
                    dispatch(writeSuccess());
                }
            ).catch(
                (error) => {
                    dispatch(writeFailed());
                }
            )
        }
};

export function loadRequest(){
    return (dispatch) => {
        dispatch(loadwrite());
        
        return axios.get("/board/load").then(
            (response) => {
                dispatch(loadwriteSuccess(response.data));
            }
        ).catch(
            ( error ) => {
                dispatch(loadwriteFailed());
            }
        )
    }
}

export function bringRequest(no){
    return (dispatch) => {
        return axios.post("/board/getwrite", {no}).then(
            (response) => {
                dispatch(bring(response.data.data));
            }
        )
    }
}

export function modifyRequest(no, title, article){
    return (dispatch) => {
        return axios.put("/board/modify/"+no, { title, article })
    }
}

export function deleteRequest(no){
    return ( dispatch ) => {
        return axios.delete( "/board/delete/"+no );
    }
}

export function commentRequest(no, contents){
    return (dispatch) => {
        dispatch(comment());

        return axios.post("/board/comment/"+no, { contents } ).then(
            (response) => {
                dispatch(commentSuccess());
            }
        ).catch(
            (error) => {
                dispatch(commentFailed());
            }
        )
    }
}

export function getComment(no){
    return (dispatch) => {
        return axios.post("/board/getcomments/"+no, { no }).then(
            (response) => {
                dispatch(getCommentSuccess(response.data.boardcontents));
            }
        );
    };
};

export function write(){
    return {
        type : types.WRITE
    }
};

export function writeSuccess(){
    return {
        type : types.WRITE_SUCCESS
    }
};

export function writeFailed(){
    return {
        type : types.WRITE_FAILED
    }
};

export function loadwrite(){
    return {
        type : types.LOAD_WRITE
    };
};

export function loadwriteSuccess(data){
    return {
        type : types.LOAD_WRITE_SUCCESS,
        data
    };
};

export function loadwriteFailed(){
    return {
        type : types.LOAD_WRITE_FAILED
    };
};

export function bring(data){
    return {
        type : types.BRING,
        data
    };
};

export function comment(){
    return {
        type : types.COMMENT
    };
};

export function commentSuccess(data){
    return {
        type : types.COMMENT_SUCCESS,
        data
    };
};

export function commentFailed(){
    return {
        type : types.COMMENT_FAILED
    };
};

export function getCommentSuccess(data){
    return {
        type : types.GETCOMMENT_SUCCESS,
        data
    }
}