/**
 * Created by out_xu on 16/12/30.
 */
import {SET_PROBLEM_TABLE, SET_PROBLEM_DETAIL, actionCreater} from './type'
import API from '../api'
import {goto ,jumpTo} from '../utils'
import * as requestService from '../utils/request'

/**
 * 获取问题列表数据
 * @param page
 * @param size
 * @returns {function(*)}
 */
export function getProblemTable (page = 1, size = 20) {
  return async(dispatch) => {
    try {
      const params = {
        page,
        size
      }

      const data = await requestService.tget(API.problems, params)
      window.sessionStorage.setItem('neuq_oj.problempagecurr', page)
      window.sessionStorage.setItem('neuq_oj.problempagesize', size)
      window.sessionStorage.setItem('neuq_oj.problempagecount', data.total_count)

      await dispatch(actionCreater(SET_PROBLEM_TABLE, data))
      jumpTo('navigation')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 获取某个题目
 * @param params 浏览器地址参数
 * @returns {function(*)}
 */
export function getProblemInfo (params) {
  return async(dispatch) => {
    try {
      const url = params.pnum ? `${API.host}contest/${params.cid}/problem/${params.pnum}` : `${API.host}problem/${params.id}`
      const data = await requestService.tget(url)
      await dispatch(actionCreater(SET_PROBLEM_DETAIL, data))
    } catch (e) {
      goto(params.cid ? 'contests' : 'problems')
    }
  }
}

/**
 * 搜索问题
 * @param value 搜索字段
 * @param page 页码
 * @param size 条数
 * @returns {function(*)}
 */
export function searchProblems (value, page = 1, size = 20) {
  return async(dispatch) => {
    try {
      const params = {
        keyword: value,
        page,
        size
      }
      const data = await requestService.tget(API.problemssearch, params)
      window.sessionStorage.setItem('neuq_oj.problempagecurr', page)
      window.sessionStorage.setItem('neuq_oj.problempagesize', size)
      window.sessionStorage.setItem('neuq_oj.problempagecount', data.total_count)

      await dispatch(actionCreater(SET_PROBLEM_TABLE, data))

      jumpTo('navigation')
    } catch (e) {
      console.error(e)
    }
  }
}


/**
 * 提交问题
 *
 * 组件内进行 未集中管理
 */
