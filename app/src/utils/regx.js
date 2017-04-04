/**
 * Created by out_xu on 16/12/21.
 */
export default {
  mobile: /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/ig,
  password: /^\w{6,18}$/,
  mail: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
}
