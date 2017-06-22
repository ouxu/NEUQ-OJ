/**
 * Created by out_xu on 17/6/23.
 */
import { urlEncode } from 'utils'
export default (params) => {
  let {href, query} = window.location
  params = {
    ...query,
    ...params
  }
  let queryString = urlEncode(params)
  const isSearch = href.indexOf('?') === -1
  const path = isSearch ? href += '?' : href.substr(0, href.indexOf('?') + 1)
  window.location.replace(path + queryString)
}
