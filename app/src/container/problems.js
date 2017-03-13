/**
 * Created by out_xu on 16/12/30.
 */
import React from "react";
import ProblemsTable from "../components/content/problems/problemstable";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getProblemTable, searchProblems} from "../actions";

class ProblemsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {user, problemtable} =this.props;
        return (
            <div>
                {this.props.children
                ||
                <ProblemsTable data={problemtable.data}
                               getProblemTable={this.props.action.getProblemTable}
                               searchProblems={this.props.action.searchProblems}
                               key={'problem-table-' + user.id}

                />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        problemtable: state.problemtable,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    const actions = {getProblemTable, searchProblems};
    return {
        action: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsContainer);
