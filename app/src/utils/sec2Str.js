/**
 * Created by out_xu on 17/4/1.
 */

export default (sec) => {
  const addZero = t => t > 9 ? t : '0' + t
  const h = addZero(Math.floor(sec / 60 / 60))
  const m = addZero(Math.floor((sec - h * 60 * 60) / 60))
  const s = addZero(Math.floor((sec - h * 60 * 60 - m * 60)))
  return `${h} : ${m} : ${s}`
}
