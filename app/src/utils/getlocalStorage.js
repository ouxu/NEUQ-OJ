/**
 * Created by out_xu on 16/12/20.
 */
import {message} from 'antd'

export default function getlocalStorage (value) {
  if (!window.localStorage) {
    message.warn('您的浏览器不支持localStorage,请更新您的浏览器')
  } else {
    if (window.localStorage.getItem(value)) {
      return window.localStorage.getItem(value)
    } else {
      return false
    }
  }
}
