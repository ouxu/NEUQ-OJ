const columnsP = [{
  title: '',
  width: '1%',
  key: 'status-none',
  className: 'status-none'
}, {
  title: '运行结果',
  dataIndex: 'result_code',
  className: 'status-result-code'
}, {
  title: '耗时',
  dataIndex: 'CpuTime',
  className: 'status—cpu-time'
}, {
  title: 'Result',
  dataIndex: 'Result',
  className: 'status-result'
}, {
  title: '内存',
  dataIndex: 'Memory',
  className: 'status-memory'
}, {
  title: 'OutputMD5',
  dataIndex: 'OutputMD5',
  className: 'status-out-put'
}]

const columnsUP = [{
  title: '',
  width: '1%',
  key: 'status-none',
  className: 'status-none'
}, {
  title: '运行结果',
  dataIndex: 'result_code',
  width: '20%',
  className: 'problem-detail-main-result-1'
}, {
  title: '错误信息',
  dataIndex: 'result_data',
  fixed: 'center',
  className: 'status-result-data'
}]

export {columnsP, columnsUP}
