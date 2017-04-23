/**
 * Created by out_xu on 17/4/13.
 */
import NewsManageContainer from 'containers/admin/News'

import ContestManageContainer from 'containers/admin/ContestList'
import ContestEditContainer from 'containers/admin/ContestEdit'

import ProblemManageContainer from 'containers/admin/ProblemList'
import ProblemEditContainer from 'containers/admin/ProblemEdit'

const Admin = {
  path: 'admin',
  childrenRoutes: [
    {path: 'news', component: NewsManageContainer},
    {path: 'Contest-list', component: ContestManageContainer},
    {
      path: 'Contest-edit',
      component: ContestEditContainer,
      childrenRoutes: [{path: ':cid', component: ContestEditContainer}]
    },
    {path: 'Problem-list', component: ProblemManageContainer},
    {
      path: 'Problem-edit',
      component: ProblemEditContainer,
      childrenRoutes: [{path: ':id', component: ProblemEditContainer}]
    }
  ],

  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('../../components/admin/index.js'))
    }, 'admin')
  }
}
export default Admin
