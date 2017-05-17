/**
 * Created by out_xu on 16/12/30.
 */
import {
  actionCreater,
  SET_GROUPS_ME,
  SET_GROUPS_NOTICE_DETAIL,
  SET_GROUPS_NOTICES,
  SET_GROUPS_TABLE,
  SET_GROUPS_USERS
} from './type'
import API from '../api'
import { jumpTo } from 'utils'
import * as requestService from 'utils/request'
import { message } from 'antd'

/**
 * 获取用户组列表数据
 * @param page
 * @param size
 * @returns {function(*)}
 */
export function getGroupTable (page = 1, size = 20) {
  return async (dispatch) => {
    try {
      const params = {
        page,
        size
      }
      const data = await requestService.get(API.groups, params)
      window.sessionStorage.setItem('neuq_oj.groupspagecurr', page)
      window.sessionStorage.setItem('neuq_oj.groupspagesize', size)
      window.sessionStorage.setItem('neuq_oj.groupspagecount', data.total_count)

      await dispatch(actionCreater(SET_GROUPS_TABLE, data))
      jumpTo('Navigation')
    } catch (e) {
      await dispatch(actionCreater(SET_GROUPS_TABLE, []))
      console.error(e)
    }
  }
}

/**
 * 获取用户加入用户组列表数据
 * @returns {function(*)}
 */
export function getGroupTableMe () {
  return async (dispatch) => {
    try {
      const data = await requestService.tget(API.userGroups)
      await dispatch(actionCreater(SET_GROUPS_ME, data))
    } catch (e) {
      await dispatch(actionCreater(SET_GROUPS_ME, []))
      console.error(e)
    }
  }
}

/**
 * 搜索用户组
 * @param keyword
 * @param page
 * @param size
 * @returns {(p1:*)}
 */
export function searchGroups (keyword, page = 1, size = 20) {
  return async (dispatch) => {
    try {
      const params = {
        keyword,
        page,
        size
      }
      const data = await requestService.get(API.groupsSearch, params)
      window.sessionStorage.setItem('neuq_oj.groupspagecurr', page)
      window.sessionStorage.setItem('neuq_oj.groupspagesize', size)
      window.sessionStorage.setItem('neuq_oj.groupspagecount', data.total_count)

      await dispatch(actionCreater(SET_GROUPS_TABLE, data))
      jumpTo('Navigation')
    } catch (e) {
      await dispatch(actionCreater(SET_GROUPS_TABLE, []))
      console.error(e)
    }
  }
}

/**
 * 关闭用户组
 * @param password
 * @returns {function(*)}
 */
export function closeUserGroup (id, password) {
  return async () => {
    try {
      await requestService.tpost(API.groups + '/' + id + '/close', password)
      message.success('关闭成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 创建用户组
 * @param body
 * @returns {function()}
 */
export function createUserGroup (body) {
  return async () => {
    try {
      await requestService.tpost(API.groupsCreate, body)
      message.success('创建成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 加入用户组
 * @param id
 * @param password
 * @returns {function()}
 */
export function joinGroup (id, password) {
  return async () => {
    try {
      await requestService.tpost(API.groups + '/' + id + '/join-in', password)
      message.success('加入成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 获取用户组用户
 * @param id
 * @param page
 * @param size
 * @returns {function(*)}
 */
export function getGroupUsers (id, page = 1, size = 20) {
  return async (dispatch) => {
    try {
      const params = {
        page,
        size
      }
      const data = requestService.tget(API.groups + '/' + id + '/members', params)
      dispatch(actionCreater(SET_GROUPS_USERS, data))
    } catch (e) {
      dispatch(actionCreater(SET_GROUPS_USERS, []))
      console.error(e.message)
    }
  }
}

/**
 * 改变用户组所有者
 * @param id
 * @param body
 * @returns {function()}
 */
export function changeGroupOwner (id, body) {
  return async () => {
    try {
      await requestService.tpost(API.groups + '/' + id + '/change-owner', body)
      message.success('修改成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 开放用户组
 * @param id
 * @param password
 * @returns {function()}
 */
export function openGroup (id, password) {
  return async () => {
    try {
      await requestService.tpost(API.groups + '/' + id + '/open', password)
      message.success('修改成功')
    } catch (e) {
      console.error(e.message)
    }
  }
}

/**
 * 解散用户组
 * @param id
 * @param password
 * @returns {function()}
 */
export function dismissGroup (id, password) {
  return async () => {
    try {
      await requestService.tpost(API.groups + '/' + id + '/dismiss', password)
      message.success('修改成功')
    } catch (e) {
      console.error(e.message)
    }
  }
}

/**
 * 退出用户组
 * @param id
 * @param password
 * @returns {function()}
 */
export function quitGroup (id, password) {
  return async () => {
    try {
      await requestService.tpost(API.groups + '/' + id + '/quit', password)
      message.success('修改成功')
    } catch (e) {
      console.error(e.message)
    }
  }
}

/**
 * 获取用户组公告列表
 * @param gid
 * @param page
 * @param size
 * @returns {function(*)}
 */
export function getGroupNotice (gid, page = 1, size = 10) {
  return async (dispatch) => {
    try {
      const params = {
        gid,
        page,
        size
      }
      const data = requestService.tget(API.groupsNoticeGet, params)
      dispatch(actionCreater(SET_GROUPS_NOTICES, data))
    } catch (e) {
      dispatch(actionCreater(SET_GROUPS_NOTICES, []))
      console.error(e.message)
    }
  }
}

/**
 * 获取用户组公告内容
 * @param gid
 * @returns {function(*)}
 */
export function getGroupNoticeDetail (id, gid) {
  return async (dispatch) => {
    try {
      const params = {
        gid
      }
      const data = requestService.tget(API.groupsNoticeDetail + id, params)
      dispatch(actionCreater(SET_GROUPS_NOTICE_DETAIL, data))
    } catch (e) {
      dispatch(actionCreater(SET_GROUPS_NOTICE_DETAIL, {}))
      console.error(e.message)
    }
  }
}

/**
 * 更新用户组公告
 * @param id
 * @param body
 * @returns {function()}
 */
export function updateGroupNotice (id, body) {
  return async () => {
    try {
      await requestService.tpost(API.groupsNoticeUpdate + id, body)
      message.success('更新成功')
    } catch (e) {
      console.error(e.message)
    }
  }
}

/**
 * 删除用户组内公告
 * @param id
 * @param gid
 * @returns {function()}
 */
export function delGroupNotice (id, gid) {
  return async () => {
    try {
      const params = {
        gid
      }
      await requestService.tget(API.groupsNoticeDel + id, params)
      message.success('删除成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 创建用户组通知
 * @param body
 * @returns {function()}
 */
export function createGroupNotice (body) {
  return async () => {
    try {
      await requestService.tpost(API.groupsNoticeCreate, body)
    } catch (e) {
      console.error(e.message)
    }
  }
}