import * as types from "../actions/showlogin/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    show : false,
    show_join : false
};

export default function showlogin(state = initialState, action){
    
    switch(action.type){

        case (types.LOGIN_MODAL) :
            return update(state, {
                show : {$set : true}
            });

        case (types.HIDE_LOGIN) :
            return update(state, {
                show : {$set : false},
                show_join : {$set : false}
            });

        case (types.SHOW_JOIN) :
            return update(state, {
                show : {$set : true},
                show_join : {$set : true}
            });

        case (types.HIDE_JOIN) :
            return update(state, {
                show_join : {$set : false}
            });

        default :
            return state;
    }
};