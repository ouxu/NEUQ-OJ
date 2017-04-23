/**
 * Created by out_xu on 16/12/23.
 */

import API from '../api'
import * as requestService from 'utils/request'
import { actionCreater, LOADED, LOADING, SET_HOME_NEWS } from './type'

/**
 * 获取主页信息
 * @returns {function(*)}
 */
export function fetchHomePageData () {
  return async (dispatch) => {
    try {
      await dispatch(actionCreater(LOADING))
      const data = await requestService.get(API.newsIndex)
      await dispatch(actionCreater(SET_HOME_NEWS, data))
    } catch (e) {
      console.error(e)
    }
    await dispatch(actionCreater(LOADED))
  }
}
