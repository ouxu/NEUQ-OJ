/**
 * Created by out_xu on 17/3/28.
 */

import {SET_NEWS_LIST, SET_NEWS} from 'actions/type'

const initAdmin = {
  news: {},
  newsList: {}
}

export default function admin (state = initAdmin, action) {
  switch (action.type) {
    case SET_NEWS_LIST:
      return {
        ...state,
        newsList: action.payload
      }
    case SET_NEWS:
      return {
        ...state,
        news: action.payload
      }
    default:
      return state
  }
}
