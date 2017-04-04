/**
 * Created by out_xu on 16/12/20.
 */
import { SET_USERINFO, SET_USERME, IS_LOGINED, CLEAN_USERME } from '../actions/type'

const initUser = {
  userinfo: {},
  userme: {},
  islogined: false
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
        islogined: true
      }
    case CLEAN_USERME:
      return {
        ...state,
        userme: {},
        islogined: false
      }
    case IS_LOGINED:
      return {
        ...state,
        islogined: true
      }
    default:
      return state
  }
}
