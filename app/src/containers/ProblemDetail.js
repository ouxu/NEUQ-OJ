/**
 * Created by out_xu on 17/1/3.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProblemInfo, tokenVerify } from 'actions'
import ProblemDetail from 'components/content/Problems/ProblemDetail'

export default connect(
  state => state.problems,
  dispatch => bindActionCreators({getProblemInfo, tokenVerify}, dispatch),
)(ProblemDetail)
