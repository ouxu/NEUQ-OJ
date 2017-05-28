/**
 * Created by out_xu on 16/12/20.
 */

// const __APIHOST__ = 'http://192.168.1.189:3000'
const __APIHOST__ = 'http://oj.marklux.cn'

const apiMaker = path => `${__APIHOST__}/${path}`

export default {
  host: apiMaker(''),
  // user
  tokenVerify: apiMaker('token-verify'),
  register: apiMaker('user/register'),
  userActive: apiMaker('user/active'),
  userMail: apiMaker('user/active-mail/send'),
  forgotPassword: apiMaker('user/forgot-password'),
  resetPassword: apiMaker('user/reset-password'),
  findPassword: apiMaker('user/reset-password/verify'),
  login: apiMaker('user/login'),
  logout: apiMaker('user/logout'),
  userMe: apiMaker('user/me'),
  userInfo: apiMaker('user/'),  // '/{id}/info'
  updateUserInfo: apiMaker('user/update'),
  messageCount: apiMaker('message/getMessageCount'),
  checkMessage: apiMaker('message/checkMessage/'),
  // Problems
  problems: apiMaker('problems'),
  problem: apiMaker('problem/'),
  problemsSearch: apiMaker('problems/search'),
  problemsMine: apiMaker('problems/mine'),
  // UserGroup
  groups: apiMaker('user-groups'),
  group: apiMaker('user-group/'),
  userGroups: apiMaker('user/groups'),
  groupsSearch: apiMaker('user-groups/search'),
  groupCreate: apiMaker('user-group/create'),
  groupNoticesGet: apiMaker('user-group/notices/get'),
  groupNoticeDetail: apiMaker('user-group/notices/show/'),
  groupNoticeDel: apiMaker('user-group/notices/delete/'),
  groupNoticeUpdate: apiMaker('user-group/notices/update/'),
  groupNoticeCreate: apiMaker('user-group/notices/create'),
  // submit: /Problem/{id}/submit
  solution: apiMaker('solution/'),
  // Status
  status: apiMaker('status'),

  // Contests
  contests: apiMaker('contests'),
  contestsSearch: apiMaker('contest/search'),
  contest: apiMaker('contest/'), // Contest/{id}
  createContest: apiMaker('contest/create'), // Contest/{id}
  contestsMine: apiMaker('contests/mine'),

  // Ranklist
  ranklist: apiMaker('user/ranklist'),
  test: apiMaker('test'),

  // News
  news: apiMaker('news'),
  createNews: apiMaker('news/create'),
  newsIndex: apiMaker('news/index')
}
