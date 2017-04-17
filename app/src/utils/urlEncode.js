/**
 * Created by out_xu on 17/2/19.
 * 借鉴http://www.tuicool.com/articles/uaIr2mj
 */

export default function urlEncode (params) {
  let paramsArray = []
  Object.keys(params).forEach(key => params[key] && paramsArray.push(`${key}=${params[key]}`))
  return paramsArray.join('&')
}
