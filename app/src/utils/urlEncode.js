/**
 * Created by out_xu on 17/2/19.
 * 借鉴http://www.tuicool.com/articles/uaIr2mj
 */

export default function urlEncode(param, key, encode) {
  if (param === null) { return ''; }
  let paramStr = '';
  const t = typeof (param);
  const i = false;
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += `${key}=${(encode === null || encode) ? encodeURIComponent(param) : param}&`;
  } else {
    for (const i in param) {
      const k = key === null ? i : key + (param instanceof Array ? `[${i}]` : `.${i}`);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
}
