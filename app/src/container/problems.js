/**
 * Created by out_xu on 16/12/30.
 */
import React from "react";
import ProblemsTable from "../components/content/problems/problemstable";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getProblemTable, searchProblems} from "../actions";

@connect(
    state => ({
        problems:state.problems,
        user: state.user
    }),
    dispatch => bindActionCreators({getProblemTable, searchProblems}, dispatch)
)
class ProblemsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {problems:{problemtable},user:{islogined}} =this.props;
        return (
            <div>
                {
                    this.props.children
                    ||
                    <ProblemsTable
                        data={problemtable.data}
                        getProblemTable={this.props.getProblemTable}
                        searchProblems={this.props.searchProblems}
                        key={'problem-table-table'+islogined}
                    />}
            </div>
        )
    }
}
export default ProblemsContainer;
