
import React from 'react'
import EditorCode from 'components/admin/EditorCode'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editorCode} from 'actions'

export default connect(
  state => ({ }),
  dispatch => bindActionCreators({editorCode}, dispatch),
)(EditorCode)
