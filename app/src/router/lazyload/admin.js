/**
 * Created by out_xu on 17/4/13.
 */
import NewsManageContainer from '../../containers/admin/news'

import ContestManageContainer from '../../containers/admin/contestlist'
import ContestEditContainer from '../../containers/admin/contestedit'

import ProblemManageContainer from '../../containers/admin/problemlist'
import ProblemEditContainer from '../../containers/admin/problemedit'

const Admin = {
  path: 'admin',
  childrenRoutes: [
    {path: 'news', component: NewsManageContainer},
    {path: 'contest-list', component: ContestManageContainer},
    {
      path: 'contest-edit',
      component: ContestEditContainer,
      childrenRoutes: [{path: ':cid', component: ContestEditContainer}]
    },
    {path: 'problem-list', component: ProblemManageContainer},
    {
      path: 'problem-edit',
      component: ProblemEditContainer,
      childrenRoutes: [{path: ':id', component: ProblemEditContainer}]
    },
  ],

  getComponents(nextState, callback){
    require.ensure([], () => {
      callback(null, require('../../components/admin/index.js'));
    }, 'admin')
  }
};
export default Admin