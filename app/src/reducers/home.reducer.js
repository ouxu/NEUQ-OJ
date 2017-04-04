/**
 * Created by out_xu on 16/12/20.
 */
import {SET_HOMEPAGE_INFO, SET_HOME_NEWS} from '../actions/type'

const initHome = {
  home: {},
  news: {}
}
export default function home (state = initHome, action) {
  switch (action.type) {
    case SET_HOMEPAGE_INFO:
      return {
        ...state,
        home: action.payload
      }
    case SET_HOME_NEWS:
      return {
        ...state,
        news: action.payload
      }
    default:
      return state
  }
}
