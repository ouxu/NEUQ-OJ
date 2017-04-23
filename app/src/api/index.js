/**
 * Created by out_xu on 16/12/20.
 */

// const __APIHOST__ = "http://192.168.1.191:3000"
// const __APIHOST__ = "http://192.168.1.221:8000"
const __APIHOST__ = 'http://oj.marklux.cn'

const apiMaker = path => `${__APIHOST__}/${path}`

export default {
  host: apiMaker(''),
  // user
  tokenverify: apiMaker('token-Verify'),
  register: apiMaker('user/Register'),
  userActive: apiMaker('user/Active'),
  userMail: apiMaker('user/Active-mail/send'),
  forgotPassword: apiMaker('user/forgot-password'),
  resetPassword: apiMaker('user/reset-password'),
  findPassword: apiMaker('user/reset-password/Verify'),
  login: apiMaker('user/login'),
  logout: apiMaker('user/logout'),
  userme: apiMaker('user/me'),
  userinfo: apiMaker('user/'),  // '/{id}/info'
  messageCount: apiMaker('message/getMessageCount'),
  checkMessage: apiMaker('message/checkMessage/'),
  // homedata: apiMaker('News/data'),
  homedata: 'http://rap.taobao.org/mockjsdata/12142/News/data',
  // Problems
  problems: apiMaker('problems'),
  problem: apiMaker('Problem/'),
  problemssearch: apiMaker('Problems/search'),
  problemsmine: apiMaker('Problems/mine'),

  // submit: /Problem/{id}/submit
  solution: apiMaker('solution/'),
  // Status
  status: apiMaker('status'),

  // Contests
  contests: apiMaker('contests'),
  contestssearch: apiMaker('Contest/search'),
  contest: apiMaker('Contest/'), // Contest/{id}
  createcontest: apiMaker('Contest/create'), // Contest/{id}
  contestsmine: apiMaker('Contests/mine'),

  // Ranklist
  ranklist: apiMaker('user/Ranklist'),
  test: apiMaker('test'),

  // News
  news: apiMaker('news'),
  createnews: apiMaker('News/create'),
  newsindex: apiMaker('News/index')
}
