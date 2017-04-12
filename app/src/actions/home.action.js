/**
 * Created by out_xu on 16/12/23.
 */
/**
 * 获取主页信息
 * @param home
 */
import API from '../api'
import * as requestService from '../utils/request'
import { actionCreater, LOADED, LOADING, SET_HOME_NEWS } from './type'

export function fetchHomePageData () {
  return async (dispatch) => {
    try {
      await dispatch(actionCreater(LOADING))
      const data = await requestService.get(API.newsindex)
      await dispatch(actionCreater(SET_HOME_NEWS, data))

    } catch (e) {
      console.error(e)
    }
    await dispatch(actionCreater(LOADED))
  }
}
