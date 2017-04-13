import React from 'react'
import { browserHistory, hashHistory, IndexRoute, Route, Router } from 'react-router'
import { message } from 'antd'
// 引入单个页面（包括嵌套的子页面）
import AppComponent from '../components'
import NotFoundPage from '../components/plugins/nofind/nofind.js'
import Register from '../components/user/register'
import HomePageContainer from '../containers/homepage'
import ProblemsContainer from '../containers/problems'
import UserPageContainer from '../containers/userpage'
import StatusContainer from '../containers/status'
import ContestsContainer from '../containers/contest'
import ContestInfoContainer from '../containers/contestinfo'
import RanklistContainer from '../containers/ranklist'
import AdminComponent from '../components/admin'
import NewsManageContainer from '../containers/admin/news'

import ContestManageContainer from '../containers/admin/contestlist'
// import ContestEditContainer from '../containers/admin/contestedit'

import ProblemManageContainer from '../containers/admin/problemlist'
// import ProblemEditContainer from '../containers/admin/problemedit'
import ProblemUploadContainer from '../containers/admin/problemupload'

import ProblemDetail from './lazyload/problemDetail'
import ContestEdit from './lazyload/admin/contestedit'
import ProblemEdit from './lazyload/admin/problemedit'



// 配置路由，并将路由注入到id为app的DOM元素中，后期需要React-router-ensure
// TODO onEnter
// TODO loading
const checkdata = (location, replace) => {
  const userRole = window.localStorage.getItem('neuq_oj.role')
  if (userRole === 'user' || !userRole) {
    message.error('权限不足')
    replace({pathname: '/'})
  }
}

const history = process.env.NODE_ENV === 'development' ? hashHistory : browserHistory

const RouterApp = store => (
  <Router history={history}>
    <Route path='/' component={AppComponent}>
      <IndexRoute component={HomePageContainer}/>
      <Route path='homepage' component={HomePageContainer}/>
      <Route path='problems'>
        <IndexRoute component={ProblemsContainer}/>
        <Route path=':id' getComponent={ProblemDetail}/>
      </Route>
      <Route path='userpage/:id' component={UserPageContainer}/>

      <Route path='register' component={Register}/>
      <Route path='status' components={StatusContainer}>
        <Route path=':id' component={StatusContainer}/>
      </Route>
      <Route path='ranklist' component={RanklistContainer}/>

      <Route path='contests'>
        <IndexRoute component={ContestsContainer}/>

        <Route path=':cid'>
          <IndexRoute component={ContestInfoContainer}/>
          <Route path='problem/:pnum' getComponent={ProblemDetail}/>
        </Route>
      </Route>

      <Route path='404' component={NotFoundPage}/>

    </Route>

    <Route path='admin' component={AdminComponent} onEnter={checkdata}>
      <IndexRoute component={NewsManageContainer}/>
      <Route path='news' component={NewsManageContainer}/>

      <Route path='contest-list' component={ContestManageContainer}/>
      <Route path='contest-edit' getComponent={ContestEdit}>
        <Route path=':cid' getComponent={ContestEdit}/>
      </Route>

      <Route path='problem-list' component={ProblemManageContainer}/>
      <Route path='problem-edit' getComponent={ProblemEdit}>
        <Route path=':id' getComponent={ProblemEdit}/>
      </Route>
      <Route path='problem-upload' component={ProblemUploadContainer}/>
    </Route>
  </Router>
)

export default RouterApp
