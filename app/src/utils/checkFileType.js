/**
 * Created by qoder on 16/11/5.
 */

export default (filename, type) => {
  if (filename.split('.').pop() === type) {
    return true
  }
  return false
}
