export default url => {
  if (!url) {
    return
  }
  let queryArr = url.substring(url.indexOf('?') + 1, url.length).split('&')
  let query = {}
  queryArr.forEach((record) => {

    let name = record.substring(0, record.indexOf('=')).toLowerCase()
    let value = record.substring(record.indexOf('=') + 1, record.length)

    if (name) {
      if (query[name]) {
        query[name] = [
          query.name,
          value
        ]
      } else {
        query[name] = value
      }
    } else {
      query[value] = true
    }
  })
  return query
}