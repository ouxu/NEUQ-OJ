/**
 * Created by out_xu on 16/12/30.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GroupsPanel from 'components/content/Groups/GroupsPanel'

export default connect(
  state => ({
    groups: state.groups,
  }),
  dispatch => bindActionCreators({}, dispatch),
)(GroupsPanel)
