/**
 * Created by out_xu on 17/6/23.
 */
import { urlEncode } from 'utils'
export default (router, params, clear = false) => {
  let {location: {pathname, query}} = router
  params = clear ? params : {
    ...query,
    ...params
  }
  let queryString = urlEncode(params)
  if (process.env.NODE_ENV === 'development') {
    pathname = '/#' + pathname
  }
  window.location.replace(`${pathname}?${queryString}`)
}
