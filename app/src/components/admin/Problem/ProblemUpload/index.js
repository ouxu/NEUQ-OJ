import React, { Component } from 'react'
import API from 'api'
import { Icon, message, Upload } from 'antd'
import { checkFileType, codeHelper, getLocalStorage } from 'utils'

const Dragger = Upload.Dragger

class ProblemUpload extends Component {
  render () {
    const props = {
      name: 'fps',
      showUploadList: true,
      action: API.problemRunData.replace(/id/, 1111),
      headers: {
        'token': getLocalStorage('neuq_oj.token')
      },
      beforeUpload (file) {
        if (!checkFileType(file.name, 'xml')) {
          message.error('请上传xml格式的文件')
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
    return (
      <div>
        <span className='h-1'>导入题目(开发中)</span>
        <div style={{marginTop: 16, height: 180}}>
          <Dragger {...props}>
            <p className='ant-upload-drag-icon'>
              <Icon type='inbox' />
            </p>
            <p className='ant-upload-text'>点击或者拖拽文件到此区域上传</p>
            <p className='ant-upload-hint'>支持上传xml格式文件</p>
          </Dragger>
        </div>
      </div>
    )
  }
}

export default ProblemUpload
