/**
 * Created by out_xu on 17/4/13.
 */

const ProblemDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/ProblemDetial'))
  }, 'problemdetial')
}

export default ProblemDetail
