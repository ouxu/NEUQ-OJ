
import React from 'react'
import TeamGenerator from 'components/admin/TeamGenerator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({}, dispatch),
)(TeamGenerator)
