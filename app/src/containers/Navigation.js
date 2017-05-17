/**
 * Created by out_xu on 17/2/28.
 */
import Navigation from 'components/plugins/Navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getMessageCount, getUserMe, logout, tokenVerify } from 'actions'

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => bindActionCreators({logout, tokenVerify, getMessageCount, getUserMe}, dispatch)
)(Navigation)
