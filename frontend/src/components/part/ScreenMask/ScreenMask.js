import React, {Component} from "react";
import styles from "./ScreenMask.scss";
import classNames from "classnames/bind";
import { hidelogin } from "../../actions/showlogin";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class ScreenMask extends Component{

    constructor(props){
        super(props);

        this.hide = this.hide.bind(this);
    }
    
    hide(){
        this.props.hideview()
    };

    render(){
        return (
            <div className = {cx("mask")}>
                <div className = {cx("content-wrapper")}>
                    <div className = {cx("cancel")}>
                        <i className = "small material-icons" onClick = {this.hide}>cancel</i>
                    </div>
                    <div className = {cx("content-in")}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return{
        show : state.showlogin.show
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideview : () => {
            return dispatch(hidelogin())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMask);