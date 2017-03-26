/**
 * Created by out_xu on 17/1/5.
 */
import { SET_STATUS_TABLE } from './type';
import API from '../api';
import jumpTo from '../utils/windowScroll';
import * as requestService from '../utils/request';


/**
 * 设置当前提交状态
 * @param data
 */
const setStatusList = data => ({
  type: SET_STATUS_TABLE,
  payload: data
});

/**
 * 获取当前提交状态
 * @param page 页码
 * @param size 条数
 * @param searchobj 筛选条件
 * @returns {function(*)} dispatch action
 */
export function getStatusTable(page = 1, size = 20, searchobj) {
  return async (dispatch) => {
    try {
      const params = {
        ...searchobj,
        page,
        size
      };
      const data = await requestService.get(API.status, params);

      sessionStorage.setItem('neuq_oj.statuspagecurr', page);
      sessionStorage.setItem('neuq_oj.statuspagesize', size);

      await dispatch(setStatusList(data));
      jumpTo('navigation');
    } catch (e) {
      console.error(e);
    }
  };
}
