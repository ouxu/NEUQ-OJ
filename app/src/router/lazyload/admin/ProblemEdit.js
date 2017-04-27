/**
 * Created by out_xu on 17/4/13.
 */
const ProblemEdit = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/admin/ProblemEdit'))
  }, 'ProblemEdit')
}

export default ProblemEdit
