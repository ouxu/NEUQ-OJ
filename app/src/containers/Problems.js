/**
 * Created by out_xu on 16/12/30.
 */
import React from 'react'
import ProblemsTable from 'components/content/Problems/ProblemsTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProblemTable, searchProblems } from 'actions'

@connect(
  state => ({
    problems: state.problems,
    user: state.user
  }),
  dispatch => bindActionCreators({getProblemTable, searchProblems}, dispatch),
)
class ProblemsContainer extends React.Component {
  render () {
    const {problems: {problemTable}, user: {isLogined}} = this.props
    return (
      <ProblemsTable
        data={problemTable.problems}
        getProblemTable={this.props.getProblemTable}
        searchProblems={this.props.searchProblems}
        key={`problem-table-table${isLogined}`}
      />
    )
  }
}
export default ProblemsContainer
