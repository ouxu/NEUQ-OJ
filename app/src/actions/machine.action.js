import {
  actionCreater,
  ADD_JUDGE_SERVER,
  GET_ALL_JUDGE_LIST,
  GET_JUDGE_LIST_AND_INFO,
  GET_JUDGE_SERVER_INFO
} from 'actions/type'

import API from 'api'
import {getLocalStorage, goto, jumpTo, newDate} from 'utils'
import * as requestService from 'utils/request'
import {message} from 'antd'

/**
 *添加判题服务器
 * @param body 判题服务器信息
 * @returns {function()}
 */
export function addJudgeServer(body) {
  return async () => {
    try {
      const data = await requestService.tpost(API.judgeServer, body)
      message.success('添加成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 *获取获取全部判题机器配置
 * @param
 * @returns {function(*)}
 */
export function getJudgeList() {
  return async (dispatch) => {
    try {
      let url = API.judgeServer + '/all'
      const data = await requestService.tget(url)
      let id = data.map(item => {
        return item.id
      })
      await dispatch(actionCreater(GET_ALL_JUDGE_LIST, data))
      await dispatch(actionCreater(GET_JUDGE_SERVER_INFO, id))
      message.success('获取全部判题机器配置成功')
    } catch (e) {
      console.error('获取判题机器配置失败')
    }
  }
}

/**
 *获取获取全部判题机器配置和情况
 * @param
 * @returns {function()}
 */
export function getJudgeListAndInfo() {
  return async () => {
    try {
      let url = API.judgeServer
      const data = await requestService.tget(url)
      console.log(data)
      message.success('获取全部判题机器配置和情况成功')
    } catch (e) {
      console.error('获取判题机器配置和情况失败')
    }
  }
}

/**
 *获取获取指定判题机器情况
 * @param
 * @returns {function()}
 */
export function getJudgeServerInfo(id) {
  return async () => {
    try {
      let url = `${API.judgeServer}/${id}/info`
      const data = await requestService.tget(url)
      console.log(data)
      message.success('获取判题服务器情况成功')
    } catch (e) {
      console.error('获取判题服务器情况失败')
    }
  }
}