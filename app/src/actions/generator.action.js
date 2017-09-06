import {message} from 'antd'
import {GET_TEAM_LIST} from './type'
import * as requestService from 'utils/request'
// 引入自定义工具
import API from 'api'

import {getLocalStorage, goto} from 'utils'

/**
 * 获取参赛队伍列表
 * @param body 请求体
 * @returns {function(*)}
 * */
export function createAccount(body) {
  return async (dispatch) => {
    try {
      const data = await requestService.tpost(API.teamGenerator, body)
      message.success('创建成功')
      dispatch({type: GET_TEAM_LIST, data})
    } catch (e) {
      console.log(e)
    }
  }
}