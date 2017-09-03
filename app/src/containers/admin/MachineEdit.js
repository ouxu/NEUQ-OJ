import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addJudgeServer, updateJudgeServer, clearJudgeSever,getServerInfo} from 'actions'

import MachineEdit from 'components/admin/Machine/MachineEdit'

export default connect(
  state => ({
    machines: state.machines,
    loading: state.loading
  }),
  dispatch => bindActionCreators({addJudgeServer, updateJudgeServer, clearJudgeSever,getServerInfo}, dispatch)
)(MachineEdit)
