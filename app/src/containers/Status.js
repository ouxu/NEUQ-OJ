/**
 * Created by out_xu on 17/1/5.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStatusTable, searchStatus } from 'actions'
import StatusTable from 'components/content/Status'

export default connect(
  state => state.status,
  dispatch => bindActionCreators({getStatusTable, searchStatus}, dispatch),
)(StatusTable)
