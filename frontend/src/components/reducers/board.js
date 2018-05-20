import * as types from "../actions/board/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    status : "INIT",
    load : {
        status : "INIT",
        write : []
    },
    getwrite : [],
    comment : {
        status : "INIT",
        write : []
    }
};

export default function board(state = initialState, action){
    switch(action.type){
        case (types.WRITE) :
            return update(state, {
                status : { $set: "WAITING" }
            });

        case (types.WRITE_SUCCESS) :
            return update(state, {
                status : { $set: "SUCCESS" }
            });

        case (types.WRITE_FAILED) :
            return update(state, {
                status : { $set: "FAILED" }
            });

        case (types.LOAD_WRITE) :
            return update(state, {
                load : {
                    status : { $set : "WAITING" }
                }
            });

        case (types.LOAD_WRITE_SUCCESS) :
            return update(state, {
                load : {
                    status : { $set : "SUCCESS" },
                    write : { $set : action.data }
                }
            });

        case (types.LOAD_WRITE_FAILED) :
            return update(state, {
                login : {
                    status : { $set : "FAILED" }
                }
            });

        case (types.BRING) :
            return update(state, {
                getwrite : { $set : action.data }
            })

        case (types.COMMENT) :
            return update(state, {
                comment : {
                    status : { $set : "WAIT" }
                }
            });

        case (types.COMMENT_SUCCESS) :
            return update(state, {
                comment : {
                    status : { $set : "SUCCESS" }
                }
            });

        case (types.COMMENT_FAILED) :
            return update(state, {
                comment : {
                    status : { $set : "FAILED" }
                }
            });

        case (types.GETCOMMENT_SUCCESS) :
            return update(state, {
                comment : {
                    write : { $set : action.data }
                }
            });

        default :
            return state;
    }
};