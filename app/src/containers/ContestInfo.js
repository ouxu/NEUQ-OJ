/**
 * Created by out_xu on 17/3/4.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getContest } from 'actions'
import ContestInfo from 'components/content/Contests/ContestInfo'

export default connect(
  state => state.contests,
  dispatch => bindActionCreators({getContest}, dispatch),
)(ContestInfo)
