/**
 * Created by out_xu on 17/1/5.
 */
import { SET_STATUS_TABLE, actionCreater } from './type'
import API from 'api'
import {jumpTo} from 'utils'
import * as requestService from 'utils/request'
import {message} from 'antd'
/**
 * 获取当前提交状态
 * @param page 页码
 * @param size 条数
 * @param searchobj 筛选条件
 * @returns {function(*)} dispatch action
 */
export function getStatusTable (page = 1, size = 20, searchobj) {
  return async (dispatch) => {
    try {
      const params = {
        ...searchobj,
        page,
        size
      }
      const data = await requestService.tget(API.status, params)
      // message.success('本人只能获取个人提交记录')

      window.sessionStorage.setItem('neuq_oj.statuspagecurr', page)
      window.sessionStorage.setItem('neuq_oj.statuspagesize', size)

      await dispatch(actionCreater(SET_STATUS_TABLE, data))
      jumpTo('navigation')
    } catch (e) {
      message.warn('请提前登陆！')
    }
  }
}
