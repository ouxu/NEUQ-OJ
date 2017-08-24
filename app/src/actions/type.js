/**
 * Created by out_xu on 16/12/20.
 */
export const LOADED = 'LOADED'
export const LOADING = 'LOADING'

export const SET_TIME_STAMP = 'SET_TIME_STAMP'

export const SET_HOMEPAGE_INFO = 'SET_HOMEPAGE_INFO'

export const SET_USERME = 'SET_USERME'
export const CLEAN_USERME = 'CLEAN_USERME'
export const SET_USERINFO = 'SET_USERINFO'
export const IS_LOGINED = 'IS_LOGINED'
export const SET_USER_ROLE = 'SET_USER_ROLE'

export const SET_MESSAGE_COUNT = 'SET_MESSAGE_COUNT'
// export const USER_REGISTER = 'USER_REGISTER'

export const SET_PROBLEM_TABLE = 'SET_PROBLEM_TABLE'
export const SET_PROBLEM_DETAIL = 'SET_PROBLEM_DETAIL'
export const REMOVE_PROBLEM_DETAIL = 'REMOVE_PROBLEM_DETAIL'
// export const SET_PROBLEM_RESULT = 'SET_PROBLEM_RESULT'

export const ADD_JUDGE_SERVER = 'ADD_JUDGE_SERVER'
export const GET_ALL_JUDGE_LIST = 'GET_ALL_JUDGE_LIST'
export const GET_JUDGE_SERVER_INFO= 'GET_JUDGE_SERVER_INFO'
export const GET_JUDGE_LIST_AND_INFO = 'GET_JUDGE_LIST_AND_INFO'

export const SET_GROUPS_TABLE = 'SET_GROUPS_TABLE'
export const SET_GROUPS_USERS = 'SET_GROUPS_USERS'
export const SET_GROUPS_NOTICES = 'SET_GROUPS_NOTICES'
export const SET_GROUPS_NOTICE_DETAIL = 'SET_GROUPS_NOTICE_DETAIL'
export const SET_GROUPS_ME = 'SET_GROUPS_ME'
export const SET_GROUP_INFO = 'SET_GROUP_INFO'

export const SET_STATUS_TABLE = 'SET_STATUS_TABLE'
export const SET_RANK_TABLE = 'SET_RANK_TABLE'

export const SET_CONTESTS_LIST = 'SET_CONTESTS_LIST'
export const GET_CONTEST_SUCC = 'GET_CONTEST_SUCC'
export const GET_CONTEST_ERR = 'GET_CONTEST_ERR'

export const SET_HOME_NEWS = 'SET_HOME_NEWS'

export const SET_NEWS_LIST = 'SET_NEWS_LIST'
export const SET_NEWS = 'SET_NEWS'

export const actionCreater = (type, payload = {}) => ({
  type: type,
  payload: payload
})
