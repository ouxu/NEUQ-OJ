import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearMachine, editMachine, getMachineInfo } from 'actions'

import MachineEdit from 'components/admin/Machine/MachineEdit'

export default connect(
  state => ({
    Machines: state.Machines,
    loading: state.loading
  }),
  dispatch => bindActionCreators({getMachineInfo, editMachine, clearMachine}, dispatch)
)(MachineEdit)
