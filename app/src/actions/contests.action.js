/**
 * Created by out_xu on 17/2/21.
 */
import { actionCreater, GET_CONTEST_ERR, GET_CONTEST_SUCC, SET_CONTESTS_LIST } from './type'
import API from '../api'
import goto from '../utils/goto'
import * as requestService from '../utils/request'
import jumpTo from '../utils/windowScroll'
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
        page,
        size
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
        page,
        size
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
 * 获取竞赛问题
 * @param id 问题ID
 * @returns {function(*)} dispatch action
 */
export function getContest (id) {
  return async (dispatch) => {
    try {
      if (id) {
        const data = await requestService.tget(API.contest + id)
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
 * 加入竞赛 TODO 完善加入竞赛
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
      await goto('contests/' + id)
    } catch (e) {
      goto('/contests')
    }
  }
}

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

export function editContest (body, id) {
  return async () => {
    try {
      let url = id ? API.contest + id + '/update/info' : API.createcontest
      await requestService.tpost(url, body)
      message.success('发布成功')
    } catch (e) {
      console.error(e)
    }
  }
}
