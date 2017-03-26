/**
 * Created by out_xu on 17/3/26.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getContestsTable} from "../../actions";
import ContestList from '../../components/admin/contest/contestlist'

@connect(
    state => ({
        contest: state.contests
    }),
    dispatch => bindActionCreators({getContestsTable}, dispatch),
)
class ContestManageContainer extends Component {
    componentDidMount() {
        const page = sessionStorage.getItem('neuq_oj.contestspagecurr') || 1;
        const size = sessionStorage.getItem('neuq_oj.contestspagesize') || 20;
        this.props.getContestsTable(page, size);
    }

    render() {
        const {contest} = this.props;
        console.log(contest)
        return (
            <ContestList />
        );
    }
}


export default ContestManageContainer;
