/**
 * Created by out_xu on 16/12/30.
 */
import GroupsList from 'components/admin/Group/GroupsList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGroupTable,getGroupTableMe} from 'actions'

export default connect(
  state => ({
    groups: state.groups
  }),
  dispatch => bindActionCreators({getGroupTable,getGroupTableMe}, dispatch),
)(GroupsList)
