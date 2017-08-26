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
      const {email, name, password} = data
      await this.setState({
        resultData: [
          {
            key: id,
            name,
            email,
            password
          }, {
            key: data[0].id,
            name: data[0].name,
            email: data[0].email,
            password: data[0].password
          }]
      })
      console.log(this.state.resultData)
    } catch (e) {
      console.error(e)
    }
  }
}