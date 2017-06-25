/**
 * Created by out_xu on 17/4/8.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearProblem, editProblem, getProblemInfo,deleteProblem } from 'actions'

import ProblemEdit from 'components/admin/Problem/ProblemEdit'

export default connect(
  state => ({
    problems: state.problems,
    loading: state.loading
  }),
  dispatch => bindActionCreators({getProblemInfo, editProblem, clearProblem,deleteProblem}, dispatch)
)(ProblemEdit)
