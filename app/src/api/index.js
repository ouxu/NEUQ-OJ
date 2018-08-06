/**
 * Created by out_xu on 16/12/20.
 */

// const __APIHOST__ = 'http://192.168.1.189:8080'
// const __APIHOST__ = 'http://oj.marklux.cn'
const __APIHOST__ = 'http://140.143.222.61:8088/'

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
  problemsImport: apiMaker('problems/import'),
  problemCreate: apiMaker('problem/create'),
  problemRunData: apiMaker('problem/id/rundata'),
  downloadRunData: apiMaker('rundata'),
  deleteRunData: apiMaker('rundata/id/delete'),
  uploadRunData: apiMaker('problem/id/rundata/add'),
  changeProblem: apiMaker('problem/id/update'),
  deleteProblem: apiMaker('problem/id/delete'),

  // judge server
  judgeServer: apiMaker('judge/server'),

  // Tags
  tag: apiMaker('tag/'),
  tagCreate: apiMaker('tag/createTag'),
  tagDelete: apiMaker('tag/deleteTag/'),
  tagSearchProblem: apiMaker('tag/getSameTagProblem'),
  // UserGroup
  groups: apiMaker('user-groups'),
  group: apiMaker('user-group/'),
  groupsSearch: apiMaker('user-groups/search'),
  groupCreate: apiMaker('user-group/create'),
  groupNoticeDetail: apiMaker('user-group/notices/show/'),
  groupJoined: apiMaker('user-groups/joined'),
  // submit: /Problem/{id}/submit
  solution: apiMaker('solution/'),
  // Status
  status: apiMaker('status'),
  statusDetail: apiMaker('status/source-code/:id'),

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
  newsIndex: apiMaker('news/index'),

  //team generator
  teamGenerator: apiMaker('admin/users/generate/prefix'),
  editorCode: apiMaker('admin/password/change')
}
