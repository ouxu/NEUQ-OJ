/**
 * Created by out_xu on 16/12/23.
 */
import { actionCreater, CLEAN_USERME, IS_LOGINED, SET_USERINFO, SET_USERME } from './type'
import { message } from 'antd'
import * as requestService from '../utils/request'
// 引入自定义工具
import API from '../api'
import { urlEncode } from '../utils'

/**
 * 登录验证
 * @header token
 */
export function tokenVerify () {
  return async (dispatch) => {
    try {
      await requestService.tget(API.tokenverify)
      await dispatch(actionCreater(IS_LOGINED))
    } catch (e) {
      window.localStorage.removeItem('neuq_oj.token')
      window.localStorage.removeItem('neuq_oj.name')
      window.localStorage.removeItem('neuq_oj.id')
      throw new Error('未登录', dispatch(actionCreater(CLEAN_USERME)))
    }
  }
}

/**
 * 登录
 * @param body
 */
export function login (body) {
  return async (dispatch) => {
    try {
      const data = await requestService.post(API.login, body)
      window.localStorage.setItem('neuq_oj.token', data.token)
      window.localStorage.setItem('neuq_oj.name', data.user.name)
      window.localStorage.setItem('neuq_oj.id', data.user.id)
      await dispatch(actionCreater(SET_USERME, data.user))
      message.success('登录成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 登出
 * @returns {function(*)}
 */
export function logout () {
  return async (dispatch) => {
    try {
      await requestService.tget(API.logout)
      await dispatch(actionCreater(CLEAN_USERME))

      window.window.localStorage.removeItem('neuq_oj.token')
      window.window.localStorage.removeItem('neuq_oj.name')
      window.window.localStorage.removeItem('neuq_oj.id')
      message.success('登出成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 获取用户信息
 * @returns {function(*)}
 */
export function getUserMe () {
  return async (dispatch) => {
    try {
      const data = await requestService.tget(API.userme)
      await dispatch(actionCreater(SET_USERME, data))
    } catch (e) {
      window.localStorage.removeItem('neuq_oj.token')
      window.localStorage.removeItem('neuq_oj.name')
      window.localStorage.removeItem('neuq_oj.id')
      await dispatch(actionCreater(CLEAN_USERME))
      window.history.go(-1)

      message.error('请登录')
    }
  }
}

/**
 * 获取指定用户信息
 * @param id 用户ID
 * @returns {function(*)}
 */
export function getUserInfo (id) {
  return async (dispatch) => {
    try {
      const data = await requestService.get(`${API.userinfo + id}/info`)
      dispatch(actionCreater(SET_USERINFO, data))
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 用户注册
 * @param body 注册字段
 * @returns {function(*)}
 */
export function userRegister (body) {
  return async (dispatch) => {
    try {
      let headers = {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }
      const data = requestService.post(API.register, urlEncode(body), headers)
      window.localStorage.setItem('neuq_oj.token', data.token)
      window.localStorage.setItem('neuq_oj.name', data.user.name)
      dispatch(actionCreater(SET_USERME, data.user))
      message.success('注册成功')
      window.history.go(-1)
    } catch (e) {
      console.error(e)
    }
  }
  // return dispatch => fetch(API.register, {
  //         credentials: 'include',
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  //         },
  //         body: urlEncode(body)
  //         // body: `name=${body.name}&email=${body.email}&mobile=${body.mobile}&password=${body.password}&password_confirmation=${body.password_confirmation}&school=${body.school}&captcha=${body.captcha}`
  //     }).then(res => res.json()).then((json) => {
  //         if (json.code === 0) {
  //             window.localStorage.setItem('neuq_oj.token', json.data.token);
  //             window.localStorage.setItem('neuq_oj.name', json.data.user.name);
  //             dispatch(setUserInfo(json.data.user));
  //             message.success('注册成功');
  //             window.history.go(-1);
  //         } else {
  //             codeHelper(json.code);
  //         }
  //     }).catch((e) => {
  //         console.error(e);
  //     });
}
