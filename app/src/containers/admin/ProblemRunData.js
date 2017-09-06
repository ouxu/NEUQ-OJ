import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { downloadRunData, deleteProblemRunData, getProblemRunDataTable } from 'actions'
import ProblemRunData from 'components/admin/Problem/ProblemRunData'

export default connect(
  state => ({
    problems: state.problems,
    loading: state.loading
  }),
  dispatch => bindActionCreators({downloadRunData, deleteProblemRunData, getProblemRunDataTable}, dispatch)
)(ProblemRunData)
