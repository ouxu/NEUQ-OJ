import {message} from 'antd'
import {GET_TEAM_LIST} from './type'
import * as requestService from 'utils/request'
// 引入自定义工具
import API from 'api'

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
/**
 * 重置用户密码
 * @param body 请求体
 * @returns {function(*)}
 * */
export function editorCode(body) {
  console.log('body', body)
  return async (dispatch) => {
    try {
      const data = await requestService.tpost(API.editorCode, body).then(
        res  => {
          console.log('res', res)
        }
      )
      message.success('重置成功')
      dispatch({type: GET_TEAM_LIST, data})
    } catch (e) {
      console.log(e)
    }
  }
}
