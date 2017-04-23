/**
 * Created by out_xu on 16/12/20.
 */
import { SET_USERINFO, SET_USERME, IS_LOGINED, CLEAN_USERME, SET_USER_ROLE, SET_MESSAGE_COUNT } from 'actions/type'

const initUser = {
  userInfo: {},
  userMe: {},
  islogined: false,
  role: '',
  message: {}
}
export default function user (state = initUser, action) {
  switch (action.type) {
    case SET_USERINFO:
      return {
        ...state,
        userInfo: action.payload
      }
    case SET_USERME:
      return {
        ...state,
        userMe: action.payload,
        islogined: true,
        role: user
      }
    case CLEAN_USERME:
      return {
        ...state,
        userMe: {},
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
    case SET_MESSAGE_COUNT:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state
  }
}
