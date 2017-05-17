/**
 * Created by out_xu on 17/2/21.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRankTable } from 'actions'
import RankList from 'components/content/Ranklist'

export default connect(
  state => state.ranklist,
  dispatch => bindActionCreators({getRankTable}, dispatch),
)(RankList)
