
import React from 'react'
import TeamGenerator from 'components/admin/TeamGenerator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createAccount} from 'actions'

export default connect(
  state => ({
    generator: state.generator
  }),
  dispatch => bindActionCreators({createAccount}, dispatch),
)(TeamGenerator)
