/**
 * Created by out_xu on 17/1/3.
 */
import React from "react";
//连接redux
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getProblemInfo} from "../actions";
import ProblemDetail from "../components/content/problems/problemdetail";

class ProblemDetailContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.action.getProblemInfo(this.props.params)
    }

    render() {
        const {problemdetail}=this.props;
        return (
            <ProblemDetail
                params={this.props.params}
                data={problemdetail.data}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        problemdetail: state.problemdetail
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = {getProblemInfo};
    const actionMap = {action: bindActionCreators(actions, dispatch)}
    return actionMap;
}


export default connect(mapStateToProps,mapDispatchToProps)(ProblemDetailContainer);