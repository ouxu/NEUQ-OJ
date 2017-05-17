/**
 * Created by out_xu on 17/4/23.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUserInfo } from 'actions'

import EditInfo from 'components/user/EditInfo'

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => bindActionCreators({updateUserInfo}, dispatch)
)(EditInfo)
