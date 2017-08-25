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

let machineTable = []
let indexArr = []

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

      let machineInfo = []
      const data = await requestService.tget(url)
      let id = data.map(item => {
        return item.id
      })
      for (let i in id) {
        let info = {}
        try {
          if (data[i].status) info = await requestService.tget(`${API.judgeServer}/${id[i]}/info`)
        } catch (e) {
          message.error('获取状态失败')
        }
        machineInfo.push(info)
      }
      console.log(machineInfo)
      // await dispatch(actionCreater(GET_JUDGE_SERVER_INFO, machineInfo))
      machineTable = data.map((item, index) => {
        return item.status ? Object.assign(item, machineInfo[index]) : item
      })
      console.log(machineTable)
      await dispatch(actionCreater(GET_ALL_JUDGE_LIST, machineTable))
      // message.success('获取全部判题机器配置成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 *获取获取全部判题机器配置和情况
 * @param
 * @returns {function(*)}
 */
export function getJudgeListAndInfo() {
  return async (dispatch) => {
    try {
      let url = API.judgeServer
      const data = await requestService.tget(url)
      message.success('获取全部判题机器配置和情况成功')
    } catch (e) {
      console.error('获取判题机器配置和情况失败')
    }
  }
}

