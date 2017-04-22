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
import * as requestService from '../../../../utils/request'
import API from '../../../../api'
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
      resultdata: [],
      result: null,
      errorinfo: ''
    }
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.updateCode = this.updateCode.bind(this)
    this.selectLanguage = this.selectLanguage.bind(this)
    this.checkPrivate = this.checkPrivate.bind(this)
    this.combinObj = this.combinObj.bind(this)
    this.submitProblem = this.submitProblem.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillUnmount () {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
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
      unsubmit: false
    })
  }

  selectLanguage (value) {
    this.setState({
      language: parseInt(value),
      result: null,
      unsubmit: false
    })
  }

  checkPrivate (e) {
    this.setState({
      privated: e.target.checked,
      result: null,
      unsubmit: false
    })
  }

  combinObj () {
    const {source_code, language} = this.state
    let obj = {source_code, language}
    obj = Object.assign({
      private: this.state.privated
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
          errorinfo: ''
        })
        await this.submitProblem(obj)
      }
    } catch (e) {
      message.warn(e.message)
    }
  }

  async submitProblem (body) {
    const {params} = this.props
    const url = params.pnum ? `${API.host}contest/${params.cid}/problem/${params.pnum}/submit` : `${API.host}problem/${params.id}/submit`

    const data = await requestService.tpost(url, body)
    message.success('提交成功')

    const solutionId = data.solution_id
    this.timer = setInterval(() => {
      this.getResultData(solutionId)
      const result = this.state.result
      if (result > 3) {
        if (result > 9) {
          this.getErrorInfo(solutionId, result)
        }
        clearInterval(this.timer)
      }
    }, 1000)
  }

  async getResultData (solutionId) {
    try {
      const data = await requestService.get(API.solution + solutionId)
      await this.setState({
        resultdata: [data],
        result: data.result
      })
    } catch (e) {
      console.error(e)
    }
  }

  async getErrorInfo (solution_id, result) {
    try {
      const errormode = (result === 10 ? '/runtime-info/' : '/compile-info/')

      const data = await requestService.get(API.status + errormode + solution_id)
      await this.setState({
        errorinfo: data.error
      })
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    const data = this.props.data || {}

    const {params} = this.props
    return (
      <Card className='problem-detail-wrap' bodyStyle={{padding: 0}}>
        <QueueAnim type='left' delay={100}>
          <div className='problem-detail-breadcrumb' key='problem-detail-1'>
            <Link to={params.pnum ? `/contests/${params.cid}` : '/problems'}>
              <Icon type='left'/>
              <span>{params.pnum ? '竞赛列表' : '问题列表'}</span>
            </Link>
            <div className='problem-detail-breadcrumb-detail'>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='edit'/><span>{data.creator_name}</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='exception'/><span>{data.submit}</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='check'/><span>{data.accepted}</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='clock-circle'/><span>{data.time_limit} Sec</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'><Icon type='save'/>
                <span>{data.memory_limit} MB</span>
              </span>
            </div>
          </div>
          <div className='problem-detail-header' key='problem-detail-2'>
            <h2 className='problem-detail-header-title'>{data.id} : {data.title}</h2>
            <ButtonGroup className='problem-detail-buttongroup'>
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
              : <ProblemDes data={data}/>}
          </div>

          <ButtonGroup className='problem-detail-buttongroup'>
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
