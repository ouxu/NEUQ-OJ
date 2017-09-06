import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getJudgeList, delJudgeServer} from 'actions'
import MachineList from 'components/admin/Machine/MachineList'

export default connect(
  state => ({
    machines: state.machines,
    loading: state.loading
  }),
  dispatch => bindActionCreators({getJudgeList,delJudgeServer}, dispatch),
)(MachineList)
