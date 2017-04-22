/**
 * Created by out_xu on 16/12/30.
 */
import { actionCreater, LOADED, LOADING, REMOVE_PROBLEM_DETAIL, SET_PROBLEM_DETAIL, SET_PROBLEM_TABLE } from './type'
import API from '../api'
import { goto, jumpTo } from '../utils'
import * as requestService from '../utils/request'
import { message } from 'antd'
/**
 * 获取问题列表数据
 * @param page
 * @param size
 * @returns {function(*)}
 */
export function getProblemTable (page = 1, size = 20) {
  return async (dispatch) => {
    try {
      await dispatch(actionCreater(LOADING))
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
    await dispatch(actionCreater(LOADED))
  }
}

/**
 * 获取自己所创建的问题列表
 * TODO 自己创建的问题列表
 * @param page
 * @param size
 * @returns {function(*)}
 */
export function getProblemMine (page = 1, size = 20) {
  return async (dispatch) => {
    try {
      await dispatch(actionCreater(LOADING))
      const params = {
        page,
        size
      }
      const data = await requestService.tget(API.getProblemTable, params)
      window.sessionStorage.setItem('neuq_oj.problempagecurr', page)
      window.sessionStorage.setItem('neuq_oj.problempagesize', size)
      window.sessionStorage.setItem('neuq_oj.problempagecount', data.total_count)

      await dispatch(actionCreater(SET_PROBLEM_TABLE, data))
      jumpTo('navigation')
    } catch (e) {
      console.error(e)
    }
    await dispatch(actionCreater(LOADED))
  }
}

/**
 * 获取某个题目
 * @param params 浏览器地址参数
 * @returns {function(*)}
 */
export function getProblemInfo (params) {
  return async (dispatch) => {
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
 * 获取某个题目
 * @returns {function(*)}
 */
export function clearProblem () {
  return async (dispatch) => {
    try {
      await dispatch(actionCreater(REMOVE_PROBLEM_DETAIL))
    } catch (e) {
      console.err(e.message)
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
  return async (dispatch) => {
    try {
      await dispatch(actionCreater(LOADING))

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
    await dispatch(actionCreater(LOADED))
  }
}

/**
 * 删除题目
 * @param id 题目 id
 * @param body 密码等
 * @returns {function()}
 */
export function deleteProblem (id, body) {
  return async () => {
    try {
      await requestService.tpost(API.problem + id + '/delete', body)
      await message.success('删除成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 编辑问题、创建问题
 * @param body
 * @param id
 * @returns {function()}
 */
export function editProblem (body, id) {
  return async () => {
    try {
      let url = id ? API.problem + id + '/update' : API.problem + 'create'
      console.log(url)
      requestService.tpost(url, body)
      message.success('发布成功')
      await goto('/admin/problem-list')
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
