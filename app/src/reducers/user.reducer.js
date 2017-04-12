/**
 * Created by out_xu on 16/12/20.
 */
import { SET_USERINFO, SET_USERME, IS_LOGINED, CLEAN_USERME,SET_USER_ROLE } from '../actions/type'

const initUser = {
  userinfo: {},
  userme: {},
  islogined: false,
  role: ''
}
export default function user (state = initUser, action) {
  switch (action.type) {
    case SET_USERINFO:
      return {
        ...state,
        userinfo: action.payload
      }
    case SET_USERME:
      return {
        ...state,
        userme: action.payload,
        islogined: true,
        role: user
      }
    case CLEAN_USERME:
      return {
        ...state,
        userme: {},
        islogined: false,
        role: ''
      }
    case IS_LOGINED:
      return {
        ...state,
        islogined: true
      }
    case SET_USER_ROLE:
      return {
        ...state,
        role: action.payload
      }
    default:
      return state
  }
}
