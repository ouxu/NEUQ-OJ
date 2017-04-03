/**
 * Created by out_xu on 17/3/28.
 */

import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getContest,delContest,editContest} from "../../actions";
import ContestEdit from "../../components/admin/contest/contestedit";

@connect(
    state => ({
        contest: state.contests
    }),
    dispatch => bindActionCreators({getContest,delContest,editContest}, dispatch),
)
class ContestEditContainer extends Component {
    componentDidMount() {
       try {
           this.props.getContest(this.props.params.cid);
       } catch(e) {
           console.error(e)
       }
    }

    render() {
        const {contest: {contest},params:{cid},delContest,editContest} = this.props;
        return (
            <ContestEdit
                contest = {contest}
                cid={cid}
                delContest={delContest}
                editContest={editContest}
            />
        );
    }
}


export default ContestEditContainer;
