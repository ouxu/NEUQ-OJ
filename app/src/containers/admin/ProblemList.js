/**
 * Created by out_xu on 17/4/4.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createContest, deleteProblem, getProblemTable, searchProblems } from 'actions'
import ProblemList from 'components/admin/Problem/ProblemList'

export default connect(
  state => ({
    problems: state.problems,
    loading: state.loading
  }),
  dispatch => bindActionCreators({getProblemTable, searchProblems, createContest, deleteProblem}, dispatch),
)(ProblemList)
