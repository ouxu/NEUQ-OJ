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
  tokenverify: apiMaker('token-verify'),
  register: apiMaker('user/register'),
  userActive: apiMaker('user/active'),
  userMail: apiMaker('user/active-mail/send'),
  forgotPassword: apiMaker('user/forgot-password'),
  resetPassword: apiMaker('user/reset-password'),
  findPassword: apiMaker('user/reset-password/verify'),
  login: apiMaker('user/login'),
  logout: apiMaker('user/logout'),
  userme: apiMaker('user/me'),
  userinfo: apiMaker('user/'),  // '/{id}/info'
  messageCount: apiMaker('message/getMessageCount'),
  checkMessage: apiMaker('message/checkMessage/'),
  // homedata: apiMaker('news/data'),
  homedata: 'http://rap.taobao.org/mockjsdata/12142/news/data',
  // problems
  problems: apiMaker('problems'),
  problem: apiMaker('problem/'),
  problemssearch: apiMaker('problems/search'),
  problemsmine: apiMaker('problems/mine'),

  // submit: /problem/{id}/submit
  solution: apiMaker('solution/'),
  // status
  status: apiMaker('status'),

  // contests
  contests: apiMaker('contests'),
  contestssearch: apiMaker('contest/search'),
  contest: apiMaker('contest/'), // contest/{id}
  createcontest: apiMaker('contest/create'), // contest/{id}
  contestsmine: apiMaker('contests/mine'),

  // ranklist
  ranklist: apiMaker('user/ranklist'),
  test: apiMaker('test'),

  // news
  news: apiMaker('news'),
  createnews: apiMaker('news/create'),
  newsindex: apiMaker('news/index')
}
