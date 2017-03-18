/**
 * Created by out_xu on 17/2/28.
 */
import React from "react";
import Navigation from '../components/plugins/navigation';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setTimeStamp, getUserMe, logout, tokenVerify} from "../actions";

const mapDispatchToProps = (dispatch) => {
    const actions = {setTimeStamp, getUserMe, logout, tokenVerify};
    return {
        action: bindActionCreators(actions, dispatch)
    };
};

@connect(
    state => state.user,
    mapDispatchToProps
)
class NavigationContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.action.tokenVerify();
    }
    render() {
        const {islogined}= this.props;
        return (
            <Navigation
                islogined={islogined}
                logout={this.props.action.logout}
                tokenVerify={this.props.action.tokenVerify}
            />
        )
    }
}


export default NavigationContainer;