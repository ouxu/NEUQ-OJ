import React, { Component } from 'react'
import API from 'api'
import { Icon, message, Upload, Table, Spin, Popconfirm } from 'antd'
import { checkFileType, codeHelper, getLocalStorage, parseQueryString } from 'utils'

const Dragger = Upload.Dragger

class ProblemRunData extends Component {
  componentDidMount () {
    this.props.getProblemRunDataTable(parseQueryString(window.location.href).id)
  }

  onConfirmDel = async (record) => {
    let body = {
      file_path: record.files
    }
    this.props.deleteProblemRunData(parseQueryString(window.location.href).id, body)
  }

  downloadRunData = async (record) => {
    let body = {
      file_path: record.files
    }
    this.props.downloadRunData(body, record.files)
  }

  render () {
    const {problems: {problemRunDataTable: data}, loading} = this.props
    const id = parseQueryString(window.location.href).id
    const props = {
      name: 'upload',
      action: API.uploadRunData.replace(/id/, id),
      headers: {
        'token': getLocalStorage('neuq_oj.token')
      },
      beforeUpload (file) {
        if (file.name.split('.')[1] !== 'in' && file.name.split('.')[1] !== 'out') {
          message.error('请上传in或out格式的文件')
          return false
        }
        return true
      },
      onChange (info) {
        let loading
        if (info.file.status !== 'uploading') {
          loading = message.loading('文件正在上传中')
        }
        if (info.file.status === 'done') {
          loading()
          const code = info.file.response.code
          if (code === 0) {
            message.success(`${info.file.name} 文件上传成功.`)
          } else {
            codeHelper(code)
          }
        } else if (info.file.status === 'error') {
          loading()
          message.error(`${info.file.name} 文件上传失败.`)
        }
      }
    }
    const columns = [{
      title: '文件名',
      dataIndex: 'files',
      key: 'files',
      width: 900,
      render: (text, record) => <a href='javascript:void(0);' onClick={() => this.downloadRunData(record)}>{text}</a>
    }, {
      title: '操作',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <span>
          <a href='javascript:void(0);' onClick={() => this.downloadRunData(record)}>导出</a>
          <span className='ant-divider' />
          <Popconfirm title='确认删除?' onConfirm={() => this.onConfirmDel(record)}>
            <a href='#'>删除</a>
          </Popconfirm>
        </span>
      )
    }]
    let runData = []
    for (let key in data) {
      let item = {
        key: data[key],
        files: data[key]
      }
      runData.push(item)
    }

    return (
      <div className='run-data'>
        <span className='h-1'>管理测试数据</span>
        <div style={{marginTop: 16, height: 180}}>
          <Dragger {...props}>
            <p className='ant-upload-drag-icon'>
              <Icon type='inbox' />
            </p>
            <p className='ant-upload-text'>点击或者拖拽文件到此区域上传</p>
          </Dragger>
        </div>
        <Spin tip='Loading...' spinning={loading}>
          <Table style={{marginTop: 40}} columns={columns} dataSource={runData} width={1000} pagination={false} />
        </Spin>
      </div>
    )
  }
}

export default ProblemRunData
