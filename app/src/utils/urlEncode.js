/**
 * Created by out_xu on 17/2/19.
 * 借鉴http://www.tuicool.com/articles/uaIr2mj
 */

export default function urlEncode(param, key, encode){
    if (param===null)
        return '';
    let paramStr='';
    let t = typeof (param);
    let i=false;
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param)+'&' ;
    } else {
        for (let i in param) {
            let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
}