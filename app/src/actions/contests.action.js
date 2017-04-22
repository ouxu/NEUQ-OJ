/**
 * Created by out_xu on 17/2/21.
 */
import { actionCreater, GET_CONTEST_ERR, GET_CONTEST_SUCC, LOADED, LOADING, SET_CONTESTS_LIST } from './type'
import API from '../api'
import { getLocalStorage, goto, jumpTo, newDate } from '../utils'
import * as requestService from '../utils/request'
import { message } from 'antd'

/**
 * 获取竞赛列表
 * @param page 页码
 * @param size 条数
 * @returns {function(*)} dispatch action
 */
export function getContestsTable (page = 1, size = 20) {
  return async (dispatch) => {
    try {
      const params = {
        page: page,
        size: size
      }
      const data = await requestService.get(API.contests, params)
      // 将当前输入的页码存入window.sessionStorage
      window.sessionStorage.setItem('neuq_oj.contestspagecurr', page)
      window.sessionStorage.setItem('neuq_oj.contestspagesize', size)
      window.sessionStorage.setItem('neuq_oj.contestspagecount', data.total_count)

      await dispatch(actionCreater(SET_CONTESTS_LIST, data))
      jumpTo('navigation')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 搜索竞赛
 * @param value 搜索字段
 * @param page 页码
 * @param size 条数
 * @returns {function(*)} dispatch action
 */
export function searchContests (value, page = 1, size = 20) {
  return async (dispatch) => {
    try {
      const params = {
        keyword: value,
        page: page,
        size: size
      }
      const data = await requestService.get(API.contestssearch, params)

      window.sessionStorage.setItem('neuq_oj.contestspagecurr', page)
      window.sessionStorage.setItem('neuq_oj.contestspagesize', size)
      window.sessionStorage.setItem('neuq_oj.contestspagecount', data.total_count)

      await dispatch(actionCreater(SET_CONTESTS_LIST, data))

      jumpTo('navigation')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 获取自己所创建竞赛列表
 * @param page 页码
 * @param size 条数
 * @returns {function(*)} dispatch action
 */
export function getContestsMine (page = 1, size = 20) {
  return async (dispatch) => {
    try {
      const params = {
        page: page,
        size: size
      }
      let data = {}

      const role = getLocalStorage('neuq_oj.role')
      if (role === 'admin') {
        data = await requestService.tget(API.contests, params)
      } else {
        data = await requestService.tget(API.contestsmine, params)
      }
      window.sessionStorage.setItem('neuq_oj.contestspagecurr', page)
      window.sessionStorage.setItem('neuq_oj.contestspagesize', size)
      window.sessionStorage.setItem('neuq_oj.contestspagecount', data.total_count)

      await dispatch(actionCreater(SET_CONTESTS_LIST, data))
      jumpTo('navigation')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 获取竞赛问题
 * @param id 问题ID
 * @returns {function(*)} dispatch action
 */
export function getContest (id) {
  return async (dispatch) => {
    try {
      if (id) {
        let data = await requestService.tget(API.contest + id)
        await dispatch(actionCreater(GET_CONTEST_SUCC, data))
        jumpTo('navigation')
      } else {
        dispatch(actionCreater(GET_CONTEST_ERR))
      }
    } catch (e) {
      dispatch(actionCreater(GET_CONTEST_ERR))
      throw new Error('权限不足')
    }
  }
}

/**
 * 获取竞赛信息（管理）
 * @param id
 * @returns {function(*)}
 */
export function getContestDetail (id) {
  return async dispatch => {
    try {
      await dispatch(actionCreater(LOADING))

      let data = await requestService.tget(API.contest + id + '/update')
      let {contest_info: {start_time, end_time}} = data
      let start = newDate(start_time)
      let end = newDate(end_time)
      let time = new Date()
      let progress = NaN
      if (time < start) {
        progress = 'unStart'
      } else if (time < end) {
        progress = 'running'
      } else {
        progress = 'ended'
      }
      data = {
        progress: progress,
        ...data
      }
      await dispatch(actionCreater(GET_CONTEST_SUCC, data))
    } catch (e) {
      console.error(e)
    }
    await dispatch(actionCreater(LOADED))
  }
}
/**
 * 加入竞赛
 * @param id 竞赛ID
 * @param body 验证密码
 * @returns {function()}
 */
export function joinContest (id, body) {
  return async () => {
    try {
      const url = API.contest + id + '/join'
      await requestService.tpost(url, body)
      await getContest(id)
      await goto('/contests/' + id)
    } catch (e) {
      goto('/contests')
    }
  }
}

/**
 * 删除竞赛
 * @param id 竞赛 ID
 * @param body
 * @returns {function()}
 */
export function delContest (id, body) {
  return async () => {
    try {
      await requestService.tpost(API.contest + id + '/delete', body)
      message.success('删除成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 编辑竞赛
 * @param body 参数
 * @param id 竞赛 ID
 * @returns {function(*)}
 */
export function editContest (body, id) {
  return async dispatch => {
    try {
      let url = id ? API.contest + id + '/update/info' : API.createcontest
      await requestService.tpost(url, body)
      await dispatch(actionCreater(GET_CONTEST_ERR))
      message.success('发布成功')
    } catch (e) {
      console.error(e)
    }
  }
}

export function updateContestProblems (id, body) {
  try {
    requestService.tpost(API.contest + id + '/update/problem', body)
  } catch (e) {
    console.error(e)
  }
}

/**
 * 从问题页面创建竞赛
 * @param data 问题列表
 * @returns {function(*)}
 */
export function createContest (data) {
  return dispatch => {
    dispatch(actionCreater(GET_CONTEST_SUCC, data))
  }
}
