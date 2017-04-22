/**
 * Created by out_xu on 17/4/5.
 */
export default (url) => {
  let host = 'http://' + window.location.host + '/'
  process.env.NODE_ENV === 'development' && (host += '#/')
  let win = window.open(host + url)
  win.focus()
}
