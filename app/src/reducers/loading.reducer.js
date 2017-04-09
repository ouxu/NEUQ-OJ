/**
 * Created by out_xu on 17/4/8.
 */

import { LOADED, LOADING } from '../actions/type'

export default function loading (state = false, action) {
  switch (action.type) {
    case LOADING:
      return true
    case LOADED:
      return false
    default:
      return false
  }
}
