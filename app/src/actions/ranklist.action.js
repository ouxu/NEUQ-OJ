/**
 * Created by out_xu on 17/3/11.
 */
import { actionCreater, LOADED, LOADING, SET_RANK_TABLE } from './type'
import API from '../api'
import * as requestService from '../utils/request'
import { jumpTo } from '../utils'

/**
 * 获取排行榜
 * @param scope
 * @param page
 * @param size
 * @returns {function(*)}
 */
export function getRankTable (page = 1, size = 20, scope = 'total') {
  return async (dispatch) => {
    try {
      await dispatch(actionCreater(LOADING))

      const params = {
        page: page,
        size: size,
        scope: scope
      }
      const data = await requestService.tget(API.ranklist, params)
      window.sessionStorage.setItem('neuq_oj.ranklistpagecurr', page)
      window.sessionStorage.setItem('neuq_oj.ranklistpagesize', size)
      await dispatch(actionCreater(SET_RANK_TABLE, data))

      jumpTo('navigation')
      await dispatch(actionCreater(LOADED))
    } catch (e) {
      await dispatch(actionCreater(LOADED))
      console.error(e)
    }
  }
}
