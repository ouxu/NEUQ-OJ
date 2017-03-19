/**
 * Created by out_xu on 17/2/21.
 */
import React from "react";
import ContestPage from "../components/content/contests";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getContestsTable, searchContests, joinContest} from "../actions";

@connect(
    state => state.contests,
    dispatch => bindActionCreators({getContestsTable, searchContests, joinContest}, dispatch)
)
class ContestsContainer extends React.Component {
    render() {
        const {conteststable}=this.props;
        return (
            <ContestPage
                data={conteststable.data}
                getContestsTable={this.props.getContestsTable}
                searchContests={this.props.searchContests}
                joinContest={this.props.joinContest}
            />
        )
    }
}


export default ContestsContainer
