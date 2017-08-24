import React from 'react'
import { browserHistory, hashHistory, IndexRoute, Route, Router } from 'react-router'
import { message } from 'antd'
// 引入单个页面（包括嵌套的子页面）
import AppComponent from 'components'
import NotFoundPage from 'components/plugins/Nofind'
import Register from 'components/user/Register'
import ForgetPassword from 'components/user/ForgetPassword'
import VerifyMail from 'components/user/VerifyMail'
import Actived from 'components/user/VerifyMail/Actived'

import HomePageContainer from 'containers/HomePage'
import ProblemsContainer from 'containers/Problems'
import GroupsContainer from 'containers/Groups'
import GroupsPanelContainer from 'containers/GroupsPanel'
import UserPageContainer from 'containers/UserPage'
import StatusContainer from 'containers/Status'
import ContestsContainer from 'containers/Contest'
import ContestInfoContainer from 'containers/ContestInfo'
import RanklistContainer from 'containers/RankList'
import AdminComponent from 'components/admin'
import NewsManageContainer from 'containers/admin/News'

import ContestEdit from './lazyload/admin/ContestEdit'
import ContestManageContainer from 'containers/admin/ContestList'

import ProblemManageContainer from 'containers/admin/ProblemList'
import MachineManageContainer from 'containers/admin/MachineList'
import GroupCreateContainer from 'containers/admin/GroupCreate'
import GroupListContainer from 'containers/admin/GroupList'
import GroupManageContainer from 'containers/admin/GroupManage'

import ProblemManageContainer from 'containers/admin/ProblemList'
import ProblemEdit from './lazyload/admin/ProblemEdit'
import ProblemUploadContainer from 'containers/admin/ProblemUpload'
import ProblemTag from 'containers/admin/ProblemTag'
import EditInfoContainer from 'containers/EditInfo'
import ProblemDetail from './lazyload/ProblemDetail'
import ContestEdit from './lazyload/admin/ContestEdit'
import ProblemEdit from './lazyload/admin/ProblemEdit'
import MachineEdit from './lazyload/admin/MachineEdit'

const CheckData = (location, replace) => {
  const userRole = window.localStorage.getItem('neuq_oj.role')
  if (userRole !== 'teacher' && userRole !== 'admin') {
    message.error('权限不足')
    replace({pathname: '/'})
  }
}

const history = process.env.NODE_ENV === 'development' ? hashHistory : browserHistory

const RouterApp = store => (
  <Router history={history}>
    <Route path='/' component={AppComponent}>
      <IndexRoute component={HomePageContainer} />
      <Route path='homepage' component={HomePageContainer} />
      <Route path='problems'>
        <IndexRoute component={ProblemsContainer} />
        <Route path=':id' getComponent={ProblemDetail} />
      </Route>
      <Route path='groups'>
        <IndexRoute component={GroupsContainer} />
        {/*<IndexRoute component={GroupsPanelContainer} />*/}
        <Route path=':id' component={GroupsPanelContainer} />
      </Route>

      <Route path='userpage/edit' component={EditInfoContainer} />
      <Route path='userpage/:id' component={UserPageContainer} />

      <Route path='register'>
        <IndexRoute component={Register} />
        <Route path='verify' component={VerifyMail}>
          <Route path=':vcode' component={VerifyMail} />
        </Route>
        <Route path='active' component={VerifyMail} />
        <Route path='actived' component={Actived} />
      </Route>
      <Route path='forget'>
        <IndexRoute component={ForgetPassword} />
        <Route path=':type' component={ForgetPassword} />
      </Route>
      <Route path='status' components={StatusContainer}>
        <Route path=':id' component={StatusContainer} />
      </Route>
      <Route path='ranklist' component={RanklistContainer} />
      <Route path='contests'>
        <IndexRoute component={ContestsContainer} />
        <Route path=':cid'>
          <IndexRoute component={ContestInfoContainer} />
          <Route path='problem/:pnum' getComponent={ProblemDetail} />
        </Route>
      </Route>

      <Route path='404' component={NotFoundPage} />
    </Route>

    <Route path='admin' component={AdminComponent} onEnter={CheckData}>
      <IndexRoute component={ProblemManageContainer} />
      <Route path='news' component={NewsManageContainer} />
      <Route path='contest-list' component={ContestManageContainer} />
      <Route path='contest-edit' getComponent={ContestEdit}>
        <Route path=':cid' getComponent={ContestEdit} />
      </Route>

      <Route path='problem-list' component={ProblemManageContainer} />
      <Route path='machine-list' component={MachineManageContainer} />
      <Route path='groups-list' component={GroupListContainer} />
      <Route path='group-create' component={GroupCreateContainer} />
      <Route path='group-manage'>
        <Route path=':gid' component={GroupManageContainer} />
      </Route>
      <Route path='problem-edit' getComponent={ProblemEdit}>
        <Route path=':id' getComponent={ProblemEdit} />
      </Route>
      <Route path='problem-upload' component={ProblemUploadContainer} />
      <Route path='machine-edit' getComponent={MachineEdit}>
        <Route path=':id' getComponent={MachineEdit}/>
      </Route>
      <Route path='problem-tag' component={ProblemTag} />
    </Route>
  </Router>
)

export default RouterApp
