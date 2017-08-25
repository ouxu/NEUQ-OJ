import API from '../api'
import * as requestService from 'utils/request'
import { message } from 'antd'

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
