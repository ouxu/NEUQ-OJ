/**
 * Created by out_xu on 17/3/28.
 */

import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getContest} from "../../actions";
import ContestEdit from "../../components/admin/contest/contestedit";

@connect(
    state => ({
        contest: state.contests
    }),
    dispatch => bindActionCreators({getContest}, dispatch),
)
class ContestEditContainer extends Component {
    componentDidMount() {
        this.props.params.cid &&this.props.getContest(this.props.params.cid);
    }

    render() {
        const {contest: {contest}} = this.props;
        return (
             <ContestEdit/>
        );
    }
}


export default ContestEditContainer;
