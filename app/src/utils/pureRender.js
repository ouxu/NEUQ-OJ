/**
 * Created by out_xu on 17/3/15.
 */
import shallowCompare from 'react-addons-shallow-compare';

export default function pureRender(reactComonent) {
    reactComonent.prototype.shouldComponentUpdate= function (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState)
    }
}