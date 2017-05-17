/**
 * Created by out_xu on 17/2/21.
 */
import ContestPage from 'components/content/Contests'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getContest, getContestsTable, joinContest, searchContests, tokenVerify } from 'actions'

export default connect(
  state => ({
    contests: state.contests,
    loading: state.loading
  }),
  dispatch => bindActionCreators({getContestsTable, searchContests, joinContest, getContest, tokenVerify}, dispatch),
)(ContestPage)
