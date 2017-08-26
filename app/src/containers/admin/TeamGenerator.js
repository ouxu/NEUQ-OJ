
import React from 'react'
import TeamGenerator from 'components/admin/TeamGenerator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createAccount, fetchTeamData } from 'actions'

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({createAccount, fetchTeamData}, dispatch),
)(TeamGenerator)
