/**
 * Created by out_xu on 17/4/18.
 */

import API from '../api'
import * as requestService from '../utils/request'

import {SET_MESSAGE_COUNT, actionCreater} from './type'

export function getMessageCount () {
  return async dispatch => {
    try {
      const data = await requestService.tget(API.messageCount)
      dispatch(actionCreater(SET_MESSAGE_COUNT, data))
    } catch (e) {
    }
  }
}

export function checkMessage (id) {
  return async dispatch => {
    try {
      const data = await requestService.tget(API.checkMessage + id)
      dispatch(actionCreater(SET_MESSAGE_COUNT, data))
    } catch (e) {
    }
  }
}
