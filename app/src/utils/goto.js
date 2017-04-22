/**
 * Created by out_xu on 16/12/20.
 */
import { browserHistory, hashHistory } from 'react-router'

export default (path) => {
  if (path) {
    process.env.NODE_ENV === 'development'
      ? hashHistory.push(path)
      : browserHistory.push(path)
  } else {
    throw new Error('Path cannot be null!')
  }
}
