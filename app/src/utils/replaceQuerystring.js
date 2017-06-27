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

const parseQueryString = url => {
  if (!url) {
    return
  }
  let queryArr = url.substring(url.indexOf('?') + 1, url.length).split('&')
  let query = {}
  console.log(queryArr)
  queryArr.forEach((record) => {
    let name = record.substring(0, record.indexOf('=')).toLowerCase()
    let value = record.substring(record.indexOf('=') + 1, record.length)
    if (query[name]) {
      query[name] = [
        query[name],
        value
      ]
    }
    query[name] = value
  })
  return query
}
