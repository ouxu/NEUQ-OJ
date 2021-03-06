/**
 * Created by out_xu on 17/4/11.
 */
import React from 'react'
import ProblemUpload from 'components/admin/Problem/ProblemUpload'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default connect(
  state => ({
    problems: state.problems,
  }),
  dispatch => bindActionCreators({}, dispatch),
)(ProblemUpload)
