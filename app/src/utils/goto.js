/**
 * Created by out_xu on 16/12/20.
 */
import { hashHistory,browserHistory } from 'react-router';
export default (path) => {
    process.env.NODE_ENV === 'development' ? hashHistory.push(path) : browserHistory.push(path)
};
