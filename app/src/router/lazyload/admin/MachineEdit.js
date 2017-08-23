const MachineEdit = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/admin/MachineEdit'))
  }, 'MachineEdit')
}

export default MachineEdit
