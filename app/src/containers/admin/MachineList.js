import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createContest, deleteMachine, getMachineTable, searchMachines } from 'actions'
import MachineList from 'components/admin/Machine/MachineList'

export default connect(
  state => ({
    Machines: state.Machines,
    loading: state.loading
  }),
  dispatch => bindActionCreators({getMachineTable, searchMachines, createContest, deleteMachine}, dispatch),
)(MachineList)
