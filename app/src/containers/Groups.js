/**
 * Created by out_xu on 16/12/30.
 */
import React from 'react'
import GroupsTable from 'components/content/Groups/GroupsTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGroupTable,getProblemTable, searchProblems } from 'actions'

@connect(
  state => ({
    problems: state.problems,
    user: state.user
  }),
  dispatch => bindActionCreators({getGroupTable,getProblemTable, searchProblems}, dispatch),
)
class ProblemsContainer extends React.Component {
  componentDidMount () {
    this.props.getGroupTable()
  }

  render () {
    const {problems: {problemTable}, user: {isLogined}} = this.props
    return (
      <GroupsTable
        data={problemTable.problems}
        getProblemTable={this.props.getProblemTable}
        searchProblems={this.props.searchProblems}
        key={`problem-table-table${isLogined}`}
      />
    )
  }
}
export default ProblemsContainer
