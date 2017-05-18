/**
 * Created by out_xu on 17/5/17.
 */
import {
  SET_GROUPS_ME,
  SET_GROUPS_NOTICE_DETAIL,
  SET_GROUPS_NOTICES,
  SET_GROUPS_TABLE,
  SET_GROUPS_USERS
} from 'actions/type'

const initGroups = {
  group: {},
  groupsTable: [],
  groupsMe: [],
  groupNotices: [],
  groupNoticeDetail: {},
  groupUsers: []
}

export default function groups (state = initGroups, action) {
  switch (action.type) {
    case SET_GROUPS_TABLE:
      return {
        ...state,
        groupsTable: action.payload
      }
    case SET_GROUPS_ME:
      return {
        ...state,
        groupsMe: action.payload
      }
    case SET_GROUPS_NOTICES:
      return {
        ...state,
        groupNotices: action.payload
      }
    case SET_GROUPS_NOTICE_DETAIL:
      return {
        ...state,
        groupNoticeDetail: action.payload
      }
    case SET_GROUPS_USERS:
      return {
        ...state,
        groupUsers: action.payload
      }
    default:
      return state
  }
}
