/**
 * Created by out_xu on 17/4/1.
 */

export default (sec) => {
    const addZore = t => t > 9 ? t : '0' + t
    const h = addZore(Math.floor(sec / 60 / 60));
    const m = addZore(Math.floor((sec - h * 60 * 60) / 60));
    const s = addZore(Math.floor((sec- h * 60 * 60 - m * 60)));
    return  `${h} : ${m} : ${s}`;
};
