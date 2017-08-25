export default (input, shallow, strict, output) => {
  // 递归使用到output
  for (let i in output) {
    // let value = input[i]
    // 如果是数组,就进行处理
    if (Array.isArray(input[i])) {
      if (shallow) {
        let j = 0
        let len = input[i].length
        while (j < len) {
          output[idx++] = input[i][j++]
        }
      } else {
        // 如果是全部扁平化就进行递归操作
        flatten(input[i], shallow, strict, output)
      }
    }
    // 如果不是数组,则根据 strict 的值判断跳过还是放进output数组
    else if (!strict) {
      output[idx++] = input[i]
    }
  }
  return output
}