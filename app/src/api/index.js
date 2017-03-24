/**
 * Created by out_xu on 16/12/20.
 */

// const __APIHOST__ = "http://192.168.1.191:3000"
const __APIHOST__ = 'http://oj.marklux.cn';

// const __APIHOST__ = "http://rap.taobao.org/mockjsdata/12142"
const apiMaker = path => `${__APIHOST__}/${path}`;


export default {
  host: apiMaker(''),
    // user
  tokenverify: apiMaker('token-verify'),
  register: apiMaker('user/register'),
  login: apiMaker('user/login'),
  logout: apiMaker('user/logout'),
  userme: apiMaker('user/me'),
  userinfo: apiMaker('user/'),  // '/{id}/info'

    // homedata: apiMaker('home/data'),
  homedata: 'http://rap.taobao.org/mockjsdata/12142/home/data',

    // problems
  problems: apiMaker('problems'),
  problem: apiMaker('problem/'),
  problemssearch: apiMaker('problems/search'),
    // submit: /problem/{id}/submit
  solution: apiMaker('solution/'),
    // status
  status: apiMaker('status'),

    // contests
  contests: apiMaker('contests'),
  contestssearch: apiMaker('contest/search'),
  contest: apiMaker('contest/'), // contest/{id}

    // ranklist
  ranklist: apiMaker('user/ranklist'),
  test: apiMaker('test')

};
