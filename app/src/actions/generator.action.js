import API from '../api'
import * as requestService from 'utils/request'
import { message } from 'antd'
import { actionCreater } from './type'
/**
 * 生成帐号
 * @param body
 * @returns {function()}
 */
export function createAccount (body) {
  return async () => {
    try {
      const data = await requestService.tpost(API.teamGenerator, body)
      console.log(data)
      message.success('创建成功')
      window.onload()
    } catch (e) {
      console.error(e)
    }
  }
}


/**
 * 获取队伍列表
 * @returns {function(*)}
 */
export function fetchTeamData () {
  return async dispatch => {
    try {
      const param = {
        page: 1,
        size: 1000
      }
      const teamTable = await requestService.get(API.teamGenerator, param)
      await dispatch(actionCreater(GET_Team_LIST, teamTable))
    } catch (e) {
      console.error(e)
    }
  }
}
