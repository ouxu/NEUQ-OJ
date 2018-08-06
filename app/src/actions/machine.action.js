import {
  actionCreater,
  ADD_JUDGE_SERVER,
  GET_ALL_JUDGE_LIST,
  GET_JUDGE_LIST_AND_INFO,
  GET_JUDGE_SERVER_INFO,
  REMOVE_JUDGE_SERVER
} from 'actions/type'

import API from 'api'
import {getLocalStorage, goto, jumpTo, newDate} from 'utils'
import * as requestService from 'utils/request'
import {message} from 'antd'

let machineTable = []

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
      goto('/admin/machine-list')
    } catch (e) {
      message.error('添加成功，但是服务器状态异常')
      goto('/admin/machine-list')
      console.error(e)
    }
  }
}

// 这里计划使用和add同样的页面
/**
 *
 * @param id
 * @param body
 * @return {function(*)}
 */
export function updateJudgeServer(id, body) {
  return async (dispatch) => {
    try {
      let url = `${API.judgeServer}/${id}/update`
      const data = await requestService.tpost(url, body)
      message.success('修改成功')
      goto('/admin/machine-list')
    } catch (e) {
      console.error(e)
    }
  }
}

export function clearJudgeSever() {
  return async (dispatch) => {
    try {
      await dispatch(actionCreater(GET_JUDGE_SERVER_INFO, {}))

    } catch (e) {
      console.err(e.message)
    }
  }
}

/**
 * 删除单个服务器
 * @param id
 * @return {function(*)}
 */
export function delJudgeServer(id) {
  return async (dispatch) => {
    try {
      let url = `${API.judgeServer}/${id}/delete`
      const data = await requestService.tget(url)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

}

/**
 * 获取单个判题服务器信息
 * @param id
 * @return {function(*)}
 */
export function getServerInfo(id) {
  return async (dispatch) => {
    let url = `${API.judgeServer}/${id}`
    const data = await requestService.tget(url)
    console.log(data)
    await dispatch(actionCreater(GET_JUDGE_SERVER_INFO, data[0]))
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
          // ok用来标志状态是否正常
          data[i].ok = 1
        } catch (e) {
          data[i].ok = 0
          // message.error(`获取id为${id[i]}的判题服务器状态失败`)
        }
        machineInfo.push(info)
      }
      // console.log(machineInfo)
      // await dispatch(actionCreater(GET_JUDGE_SERVER_INFO, machineInfo))
      machineTable = data.map((item, index) => {
        if (item.status === 1 && item.ok === 0) {
          item.status = 2
        }
        return Object.assign(item, machineInfo[index])
      })
      // console.log(machineTable)
      await dispatch(actionCreater(GET_ALL_JUDGE_LIST, machineTable))
      // message.success('获取全部判题机器配置成功')
    } catch (e) {
      console.error(e)
    }
  }
}


/**
 *获取获取全部判题机器配置和情况,由于这个接口会向全部的机器发请求，所以很慢，不推荐使用
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

