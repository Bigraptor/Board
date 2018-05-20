import * as types from "../actions/account/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    join : {
        status : "INIT",
        code : -1
    },
    login : {
        status : "INIT",
        code : -1
    },
    session : {
        nickname : "",
        valid : false,
        isLoggedin : false
    }
};

export default function account(state = initialState, action){
    switch(action.type){
        
        case (types.JOIN) :
            return update(state, {
                join : {
                    status : {$set : "WAITING"}
                }
            });

        case (types.JOIN_SUCCESS) :
            return update(state, {
                join : {
                    status : {$set : "SUCCESS"}
                }
            });

        case (types.JOIN_FAILED) :
            return update(state, {
                join : {
                    status : {$set : "FAILED"},
                    code : {$set : action.error}
                }
            });

        case (types.LOGIN) :
            return update(state, {
                login : {
                    status : {$set : "WAITING"}
                }
            });

        case (types.LOGIN_SUCCESS) : 
            return update(state, {
                login : {
                    status : {$set : "SUCCESS"},
                },
                session : {
                    isLoggedin : {$set : true},
                    nickname : {$set : action.nickname}
                }
            });

        case (types.LOGIN_FAILED) :
            return update(state, {
                login : {
                    status : {$set : "FAILED"},
                    code : {$set : action.error}
                }
            });

        case (types.CHECK_SESSION) :
            return update(state, {
                session : {
                    isLoggedin : {$set: true}
                }
            });

        case (types.CHECK_SESSION_SUCCESS) :
            return update(state, {
                session : {
                    valid : {$set : true},
                    nickname : {$set : action.nickname}
                }
            });

        case (types.CHECK_SESSION_FAILED) : 
            return update(state, {
                session : {
                    valid : {$set : false},
                    isLoggedin : {$set : false}
                }
            });

        case (types.LOGOUT) :
            return update(state, {
                session : {
                    isLoggedin : { $set : false}
                }
            });

        default :
            return state;
    }
};