import {actionCreater, LOADED, LOADING} from './type'
import API from 'api'
import {getLocalStorage, goto, jumpTo, newDate} from 'utils'
import * as requestService from 'utils/request'
import {message} from 'antd'

export const GET_ALL_JUDGE_LIST = 'ADD_ALL_JUDGE_LIST'
export const GET_JUDGE_SERVER_INFO= 'GET_JUDGE_SERVER_INFO'
export const GET_JUDGE_LIST_AND_INFO = 'GET_JUDGE_LIST_AND_INFO'

/**
 *添加判题服务器
 * @param body 判题服务器信息
 * @returns {function()}
 */
export function AddJudgeServer(body) {
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
 * @returns {function()}
 */
export function GetJudgeList() {
  return async () =>{
    try {
      let url = API.judgeServer+'/all'
      await requestService.tget(url)
      message.success('获取全部判题机器配置成功')
    } catch (e){
      console.error('获取判题机器配置失败')
    }
  }
}
/**
 *获取获取全部判题机器配置和情况
 * @param
 * @returns {function()}
 */
export function GetJudgeListAndInfo() {
  return async () =>{
    try {
      let url = API.judgeServer+'/all'
      await requestService.tget(url)
      message.success('获取全部判题机器配置和情况成功')
    } catch (e){
      console.error('获取判题机器配置和情况失败')
    }
  }
}