/**
 * Created by out_xu on 17/4/4.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProblemTable,searchProblems,createContest } from '../../actions'
import ProblemList from '../../components/admin/problem/problemlist'

@connect(
  state => ({
    problems: state.problems
  }),
  dispatch => bindActionCreators({getProblemTable,searchProblems,createContest}, dispatch),
)
class ProblemListManageContainer extends Component {
  render () {
    const {problems: {problemtable},getProblemTable, searchProblems,createContest} = this.props
    return (
      <ProblemList
        data={problemtable.problems}
        getProblemTable={getProblemTable}
        searchProblems={searchProblems}
        createContest ={createContest}
      />
    )
  }
}

export default ProblemListManageContainer
