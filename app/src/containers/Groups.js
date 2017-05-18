/**
 * Created by out_xu on 16/12/30.
 */
import GroupsTable from 'components/content/Groups/GroupsTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGroupTable} from 'actions'

export default connect(
  state => ({
    groups: state.groups
  }),
  dispatch => bindActionCreators({getGroupTable}, dispatch),
)(GroupsTable)
