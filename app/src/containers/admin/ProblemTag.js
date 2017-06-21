/**
 * Created by out_xu on 17/6/5.
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProblemTag from 'components/admin/Problem/ProblemTag'

export default connect(
  state => ({
    problems: state.problems,
  }),
  dispatch => bindActionCreators({}, dispatch),
)(ProblemTag)
