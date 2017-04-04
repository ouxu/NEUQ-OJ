/**
 * Created by out_xu on 17/3/9.
 */
export default (str) => {
  let date
  if (typeof (str) !== 'string') {
    date = str
  } else if (str) {
    str = str.replace(/-/g, '/')
    date = new Date(str)
  } else {
    date = new Date()
  }
  return date
}
