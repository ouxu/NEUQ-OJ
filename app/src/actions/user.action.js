/**
 * Created by out_xu on 16/12/23.
 */
import { actionCreater, CLEAN_USERME, IS_LOGINED, SET_USER_ROLE, SET_USERINFO, SET_USERME } from './type'
import { message } from 'antd'
import * as requestService from 'utils/request'
// 引入自定义工具
import API from 'api'

import { goto } from 'utils'

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
      dispatch(actionCreater(CLEAN_USERME))
      window.localStorage.removeItem('neuq_oj.token')
      window.localStorage.removeItem('neuq_oj.name')
      window.localStorage.removeItem('neuq_oj.id')
      window.localStorage.removeItem('neuq_oj.role')
      throw new Error('未登录')
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
      window.localStorage.setItem('neuq_oj.role', data.role)

      await dispatch(actionCreater(SET_USERME, data.user))
      await dispatch(actionCreater(SET_USER_ROLE, data.role))
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

      window.localStorage.removeItem('neuq_oj.token')
      window.localStorage.removeItem('neuq_oj.name')
      window.localStorage.removeItem('neuq_oj.id')
      window.localStorage.removeItem('neuq_oj.role')
      message.success('登出成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 获取自己信息
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
      window.localStorage.removeItem('neuq_oj.role')

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
  return async dispatch => {
    try {
      // let headers = {
      //   credentials: 'include',
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      //   },
      //   body: urlEncode(body)
      // }
      // const json = await fetch(API.Register, headers)
      // if (json.code === 0) {
      //   const data = await json.data
      //   await dispatch(actionCreater(SET_USERME, data.user))
      //   message.success('注册成功')
      //   window.history.go(-1)
      // } else {
      //   codeHelper(json.code)
      // }
      const {email, mobile, name, school} = body
      let userInfo = {email, mobile, name, school}
      const data = await requestService.post(API.register, body)
      dispatch(actionCreater(SET_USERINFO, {
        ...userInfo,
        user_id: data.user_id
      }))
      goto('/Register/Verify')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 发送用户激活邮件
 * @param params
 * @returns {function()}
 * @constructor
 */
export function sendActiveMail (params) {
  return async () => {
    try {
      await requestService.get(API.userMail, params)
      goto('/Register/Verify')
    } catch (e) {
      console.error(e.message)
    }
  }
}

/**
 * 通过邮箱验证码激活用户
 * @param param 验证码
 * @returns {function(*)}
 * @constructor
 */
export function activeUser (param) {
  return dispatch => {
    setTimeout(async () => {
      try {
        const data = await requestService.get(API.userActive, param)
        window.localStorage.setItem('neuq_oj.token', data.token)
        window.localStorage.setItem('neuq_oj.name', data.user.name)
        window.localStorage.setItem('neuq_oj.id', data.user.id)
        window.localStorage.setItem('neuq_oj.role', data.role)
        await dispatch(actionCreater(SET_USERME, data.user))
        await dispatch(actionCreater(SET_USER_ROLE, data.role))
        await goto('/Register/Actived')
        message.success('激活成功')
      } catch (e) {
        message.error('验证链接超时')
        goto('/Register/Active')
        console.error(e.message)
      }
    }, 2000)
  }
}

export function forgotPassword (param) {
  return async () => {
    try {
      await requestService.get(API.forgotPassword, param)
      goto('/forget/succ')
      message.success('发送成功')
    } catch (e) {
      message.success('发送失败')
    }
  }
}

export function findPassword (params) {
  return setTimeout(async () => {
    try {
      await requestService.post(API.findPassword, params)
      console.log('修改成功')
      goto('/forget/done')
    } catch (e) {
      goto('/forget')
    }
  }, 2000)
}
