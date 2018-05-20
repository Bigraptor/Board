import showlogin from "./showlogin.js";
import account from "./account.js";
import board from "./board.js";
import { combineReducers } from "redux";

const reducers = combineReducers({
    showlogin, account, board
});

export default reducers;