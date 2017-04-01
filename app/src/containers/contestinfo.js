/**
 * Created by out_xu on 17/3/4.
 */
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getContest} from "../actions";
import ContestInfo from "../components/content/contests/contestinfo";

@connect(
    state => state.contests,
    dispatch => bindActionCreators({getContest}, dispatch),
)
class ContestInfoContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.params.cid && this.props.getContest(this.props.params.cid);
    }
    render() {
        const {contest = {contest_info: {}, problem_info: []}} = this.props;
        return (
            <ContestInfo
                data={contest}
                id={this.props.params.cid}
            />
        );
    }
}


export default ContestInfoContainer;
