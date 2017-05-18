/**
 * Created by out_xu on 17/3/26.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getContestsMine, searchContests } from 'actions'
import ContestList from 'components/admin/Contest/ContestList'

export default connect(
  state => ({
    contest: state.contests
  }),
  dispatch => bindActionCreators({getContestsMine, searchContests}, dispatch),
)(ContestList)
