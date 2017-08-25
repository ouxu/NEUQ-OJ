/**
 * Created by out_xu on 16/12/30.
 */
import {
  actionCreater,
  SET_GROUP_INFO,
  SET_GROUPS_ME,
  SET_GROUPS_NOTICE_DETAIL,
  SET_GROUPS_NOTICES,
  SET_GROUPS_TABLE,
  SET_GROUPS_USERS
} from './type'
import API from '../api'
import { goto, jumpTo } from 'utils'
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
      jumpTo('navigation')
    } catch (e) {
      await dispatch(actionCreater(SET_GROUPS_TABLE, []))
      console.error(e)
    }
  }
}

/**
 * 获取用户创建的用户组列表数据
 * @returns {function(*)}
 */
export function getGroupTableCreated () {
  return async (dispatch) => {
    try {
      const params = {
        page,
        size
      }
      const data = await requestService.get(API.groups + '/created', params)
      await dispatch(actionCreater(SET_GROUPS_TABLE, data))
    } catch (e) {
      await dispatch(actionCreater(SET_GROUPS_TABLE, []))
      console.error(e)
    }
  }
}

/**
 * 获取用户创建的用户组列表数据
 * @returns {function(*)}
 */
export function getGroupTableMe () {
  return async (dispatch) => {
    try {
      const data = await requestService.tget(API.groups + '/created')
      await dispatch(actionCreater(SET_GROUPS_ME, data))
    } catch (e) {
      await dispatch(actionCreater(SET_GROUPS_ME, []))
      console.error(e)
    }
  }
}

/**
 * 获取用户组详情
 * @returns {function(*)}
 */
export function getGroupInfo (gid) {
  return async (dispatch) => {
    try {
      const data = await requestService.tget(API.group + gid)
      await dispatch(actionCreater(SET_GROUP_INFO, data))
    } catch (e) {
      await dispatch(actionCreater(SET_GROUP_INFO))
      console.error(e)
    }
  }
}

/**
 * 更新用户组详情
 * @param gid
 * @param body
 * @returns {function()}
 */
export function updateGroupInfo (gid, body) {
  return async () => {
    try {
      await requestService.tpost(API.group + gid + '/update', body)
      message.success('更新成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 搜索用户组
 * @param keyword
 * @param page
 * @param size
 * @returns {function(*)}
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
      jumpTo('navigation')
    } catch (e) {
      await dispatch(actionCreater(SET_GROUPS_TABLE, []))
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
      const data = await requestService.tpost(API.groupCreate, body)
      message.success('创建成功')
      goto('/admin/group-manage/' + data.group_id)
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
      await requestService.tpost(API.group + id + '/join', password)
      message.success('加入成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 获取用户组用户
 * @param gid
 * @param page
 * @param size
 * @returns {function(*)}
 */
export function getGroupUsers (gid, page = 1, size = 500) {
  return async (dispatch) => {
    try {
      const params = {
        page,
        size
      }
      const data = await requestService.tget(API.group + gid + '/members', params)
      dispatch(actionCreater(SET_GROUPS_USERS, data.members))
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
      await requestService.tpost(API.group + id + '/change-owner', body)
      message.success('修改成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 解散用户组
 * @param gid
 * @param body
 * @returns {function()}
 */
export function dismissGroup (gid, body) {
  return async () => {
    try {
      await requestService.tpost(API.group + gid + '/dismiss', body)
      goto('/admin/groups-list')
      message.success('解散成功')
    } catch (e) {
      console.error(e.message)
    }
  }
}

/**
 * 退出用户组r
 * @param gid
 * @param body
 * @returns {function()}
 */
export function quitGroup (gid, body) {
  return async () => {
    try {
      await requestService.tpost(API.group + gid + '/quit', body)
      message.success('操作成功')
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
export function getGroupNotices (gid, page = 1, size = 50) {
  return async (dispatch) => {
    try {
      const params = {
        page,
        size
      }
      const data = await requestService.tget(API.group + gid + '/notices', params)
      dispatch(actionCreater(SET_GROUPS_NOTICES, data))
    } catch (e) {
      dispatch(actionCreater(SET_GROUPS_NOTICES, []))
      console.error(e.message)
    }
  }
}

/**
 * 获取用户组公告内容
 * @param id
 * @param gid
 * @returns {function(*)}
 */
export function getGroupNoticeDetail (id, gid) {
  return async (dispatch) => {
    try {
      const params = {
        gid
      }
      const data = await requestService.tget(API.group + gid + '/notice/' + id, params)
      dispatch(actionCreater(SET_GROUPS_NOTICE_DETAIL, data))
    } catch (e) {
      dispatch(actionCreater(SET_GROUPS_NOTICE_DETAIL, {}))
      console.error(e.message)
    }
  }
}

/**
 * 更新用户组公告
 * @param gid
 * @param id
 * @param body
 * @returns {function()}
 */
export function updateGroupNotice (gid, id, body) {
  return async () => {
    try {
      await requestService.tpost(API.group + gid + '/notice/' + id + '/update', body)
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
      const body = {
        gid
      }
      await requestService.tget(API.group + gid + '/notice/' + id + '/delete')
      message.success('删除成功')
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 创建用户组公告
 * @param gid
 * @param body
 * @returns {function()}
 */
export function createGroupNotice (gid, body) {
  return async () => {
    try {
      await requestService.tpost(API.group + gid + '/notice/create', body)
    } catch (e) {
      console.error(e.message)
    }
  }
}

/**
 * 删除成员
 * @param gid
 * @param body
 * @returns {function()}
 */
export function delGroupUsers (gid, body) {
  return async () => {
    try {
      await requestService.tpost(API.group + gid + '/members/delete', body)
      message.success('删除成功')
    } catch (e) {
      console.error(e.message)
    }
  }
}

/**
 * 增加成员
 * @param gid
 * @param body
 * @returns {function()}
 */
export function addGroupUsers (gid, body) {
  return async () => {
    try {
      await requestService.tpost(API.group + gid + '/members/add', body)
      message.success('添加成功')
    } catch (e) {
      console.error(e.message)
    }
  }
}

/**
 * 更新成员名片
 * @returns {function()}
 * @param gid
 * @param body
 */
export function updateUserTag (gid, body) {
  return async () => {
    try {
      await requestService.tpost(API.group + gid + '/members/update', body)
      message.success('修改成功')
    } catch (e) {
      console.error(e.message)
    }
  }
}

/**
 * 获取用户加入的用户组
 * @returns {(p1:*)}
 */
export function getGroupJoined () {
  return async dispatch => {
    try {
      const data = await requestService.tget(API.groupJoined)
      await dispatch(actionCreater(SET_GROUPS_ME, data))
    } catch (e) {
      await dispatch(actionCreater(SET_GROUPS_ME, {}))
      console.error(e.message)
    }
  }
}