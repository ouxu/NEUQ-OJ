/**
 * Created by out_xu on 17/6/5.
 */
import API from '../api'
import * as requestService from 'utils/request'
import {jumpTo} from 'utils'
import { message } from 'antd'
import { actionCreater, SET_PROBLEM_TABLE } from './type'

/**
 * 创建标签
 * @param name
 * @returns {function(*)}
 */
export function createTag (name) {
  return async () => {
    try {
      await requestService.tpost(API.tagCreate, {name})
      message.success('创建成功')
    } catch (e) {
      console.error(e)
    }
  }
}
/**
 * 删除标签
 * @param tid
 * @returns {function()}
 */
export function delTag (tid) {
  return async () => {
    try {
      await requestService.tpost(API.tagDelete, {tid})
      message.success('删除成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 更新标签
 * @param tid
 * @param name
 * @returns {function()}
 */
export function updateTag (tid, name) {
  return async () => {
    try {
      await requestService.tpost(API.tag + tid + '/updateTag', {name})
      message.success('更新成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 更新标签
 * @param tid
 * @param name
 * @returns {function()}
 */
export function searchProblemByTag (tid, page, size) {
  return async () => {
    try {
      const params = {
        tid,
        page,
        size
      }
      const data = await requestService.tpost(API.tagSearchProblem, params)
      await dispatch(actionCreater(SET_PROBLEM_TABLE, data))
      jumpTo('navigation')
    } catch (e) {
      console.error(e)
    }
  }
}