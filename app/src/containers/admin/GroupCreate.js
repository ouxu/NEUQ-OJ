/**
 * Created by out_xu on 17/5/18.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createUserGroup } from 'actions'
import GroupCreate from 'components/admin/Group/GroupCreate'

export default connect(
  state => ({}),
  dispatch => bindActionCreators({createUserGroup}, dispatch),
)(GroupCreate)
