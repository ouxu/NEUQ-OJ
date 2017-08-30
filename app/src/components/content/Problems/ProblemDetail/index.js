/**
 * Created by out_xu on 17/1/3.
 */
import React from 'react'
import { Link } from 'react-router'
import { Button, Card, Icon, message } from 'antd'
import './index.less'
import QueueAnim from 'rc-queue-anim'
import ProblemDes from './problemdes'
import ProblemSub from './problemsub'
import * as requestService from 'utils/request'
import API from 'api'

const ButtonGroup = Button.Group

class ProblemDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      submit: this.props.submit || false,
      unsubmit: false,
      source_code: '',
      language: 1,
      privated: false,
      resultData: [],
      result: null,
      errorinfo: '',
      resultCode: '',
    }
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.updateCode = this.updateCode.bind(this)
    this.selectLanguage = this.selectLanguage.bind(this)
    this.checkPrivate = this.checkPrivate.bind(this)
    this.combinObj = this.combinObj.bind(this)
    this.submitProblem = this.submitProblem.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount () {
    this.props.getProblemInfo(this.props.params)
  }

  componentWillUnmount () {
    this.timer && clearInterval(this.timer)
  }

  createMarkup = html => ({__html: html})

  handleMenuClick () {
    this.setState({submit: !this.state.submit})
  }

  updateCode (newCode) {
    this.setState({
      source_code: newCode,
      result: null,
      unsubmit: false,
    })
  }

  selectLanguage (value) {
    this.setState({
      language: parseInt(value),
      result: null,
      unsubmit: false,
    })
  }

  checkPrivate (e) {
    this.setState({
      privated: e.target.checked,
      result: null,
      unsubmit: false,
    })
  }

  combinObj () {
    const {source_code, language} = this.state
    let obj = {source_code, language}
    obj = Object.assign({
      private: this.state.privated,
    }, obj)
    return obj
  }

  async submit () {
    try {
      await this.props.tokenVerify()
      const obj = this.combinObj()
      if (obj.source_code.length < 3) {
        message.error('请输入有效代码')
      } else {
        this.setState({
          unsubmit: true,
          errorinfo: '',
        })
        await this.submitProblem(obj)
      }
    } catch (e) {
      message.warn(e.message)
    }
  }

  async submitProblem (body) {
    const {params} = this.props
    const url = params.pnum
      ? `${API.host}contest/${params.cid}/problem/${params.pnum}/submit`
      : `${API.host}problem/${params.id}/submit`
    const data = await requestService.tpost(url, body)
    // console.log(data)
    message.success('提交成功')
    const {result_data, result_code} = data
    const selectCode = (code) => {
      if(code === -1) {
        return '判题系统异常'
      }else if (code === 2){
        return '编译错误'
      }else if (code === 3){
        return '部分通过'
      }else if (code === 4) {
        return 'AC'
      }
    }
    if (result_code === 3 || result_code === 4) {
      const {Passed, UnPassed} = result_data
      const {CpuTime = '', Result = '', Memory = '', OutputMD5 = ''} = Passed[0]
      await this.setState({
        resultCode: data.result_code,
        resultData: [
          {
            key: Memory,
            result_code: selectCode(result_code)+'-Passed',
            CpuTime,
            Result,
            Memory,
            OutputMD5,
          }, {
            key: UnPassed[0].Memory,
            result_code: selectCode(result_code)+'-UnPassed',
            CpuTime: UnPassed[0].CpuTime,
            Result: UnPassed[0].Result,
            Memory: UnPassed[0].Memory,
            OutputMD5: UnPassed[0].OutputMD5,
          }],
      })
    } else if (result_code === 2 || result_code === -1) {
      await this.setState({
        resultCode: data.result_code,
        resultData: [
          {
            key: 2,
            result_code: selectCode(result_code),
            result_data: result_data
          }
        ]
      })
      // console.log(result_data)
    }
  }

  async getErrorInfo (solutionId, result) {
    try {
      const errorMode = (result === 10 ? '/runtime-info/' : '/compile-info/')

      const data = await requestService.get(API.status + errorMode + solutionId)
      await this.setState({
        errorinfo: data.error,
      })
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    const {problemDetail: data = {}} = this.props

    const {params} = this.props
    return (
      <Card className='problem-detail-wrap' bodyStyle={{padding: 0}}>
        <QueueAnim type='left' delay={100}>
          <div className='problem-detail-breadcrumb' key='problem-detail-1'>
            <Link to={params.pnum ? `/contests/${params.cid}` : '/problems'}>
              <Icon type='left' />
              <span>{params.pnum ? '竞赛列表' : '问题列表'}</span>
            </Link>
            <div className='problem-detail-breadcrumb-detail'>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='edit' /><span>{data.creator_name}</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='exception' /><span>{data.submit}</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='check' /><span>{data.accepted}</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='clock-circle' /><span>{data.time_limit} Sec</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'><Icon
                type='save' />
                <span>{data.memory_limit} MB</span>
              </span>
            </div>
          </div>
          <div className='problem-detail-header' key='problem-detail-2'>
            <h2 className='problem-detail-header-title'>{data.id}
              : {data.title}</h2>
            <ButtonGroup className='problem-detail-buttonGroup'>
              <Button
                size='small'
                type={this.state.submit ? 'primary' : 'dashed'}
                onClick={this.handleMenuClick}
              >
                {this.state.submit ? '描述' : '提交'}
              </Button>

              <Button size='small' type='dashed'>讨论版</Button>
              <Button size='small' type='dashed'>状态</Button>
            </ButtonGroup>
          </div>
          <div key='problem-detail-3'>
            {this.state.submit
              ? <ProblemSub
                updataCode={this.updateCode}
                submit={this.submit}
                selectLanguage={this.selectLanguage}
                checkPrivate={this.checkPrivate}
                params={this.state}
                data={data}
              />
              : <ProblemDes data={data} />}
          </div>

          <ButtonGroup className='problem-detail-buttonGroup'>
            <Button
              type={this.state.submit ? 'primary' : 'dashed'}
              onClick={this.handleMenuClick}
            >{this.state.submit ? '描述' : '提交'}</Button>
            <Button type='dashed'>讨论版</Button>
            <Button type='dashed'>状态</Button>
          </ButtonGroup>
        </QueueAnim>
      </Card>
    )
  }
}

export default ProblemDetail
